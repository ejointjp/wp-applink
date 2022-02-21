<?php
/*
Plugin Name: WP Applink
Plugin URI: http://e-joint.jp/works/wp-applink/
Description: It is a WordPress plugin that generates iTunes PHG affiliate links such as iPhone, iPad, Mac apps and music, movies etc.
Version: 0.4.1
Author: e-JOINT.jp
Author URI: http://e-joint.jp
Text Domain: wp-applink
Domain Path: /languages
License: GPL2
*/

/*  Copyright 2017 e-JOINT.jp (email : mail@e-joint.jp)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
     published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

include_once dirname(__FILE__) . '/class/class-lookup.php';
include_once dirname(__FILE__) . '/class/class-search.php';

define('MY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CACHE_DIR', MY_PLUGIN_DIR . 'cache/');

class WP_Applink
{
  // PHGトークン
  const PHG_TOKEN = '11l64V';
  // Class Lookupのインスタンス
  public $lookup;
  private $options;
  private $version;
  private $textdomain;
  private $domainpath;

  public function __construct()
  {

    $this->set_datas();

    if (function_exists('register_activation_hook')) {
      register_activation_hook(__FILE__, array($this, 'register_activation'));
    }

    $this->options = get_option('wpal-setting');

    // 翻訳ファイルの読み込み
    add_action('plugins_loaded', array($this, 'load_plugin_textdomain'));

    add_action('admin_menu', array($this, 'add_meta_box'));
    add_action('admin_menu', array($this, 'add_plugin_page'));
    add_action('admin_init', array($this, 'page_init'));
    add_action('admin_footer', array($this, 'scripts'));
    add_action('admin_enqueue_scripts', array($this, 'add_admin_js_css'));
    add_action('wp_enqueue_scripts', array($this, 'add_styles'));
    add_action('wp_ajax_wpal_ajax_search', array($this, 'wpal_ajax_search'));
    add_action('wp_ajax_nopriv_wpal_ajax_search', array($this, 'wpal_ajax_search'));


    add_shortcode('applink', array($this, 'wpal_shortcode'));

    // Class Lookupのインスタンスを生成
    $this->lookup = new WP_Applink_Lookup();
  }

  // プラグイン有効時に実行
  public function register_activation()
  {
    if (!$this->options) {
      $default_options = array(
        'token' => self::PHG_TOKEN,
        'cache' => '1 month ago',
        'post-type' => $this->get_post_types()
      );

      update_option('wpal-setting', $default_options);
    }
  }

  private function set_datas()
  {
    $datas = get_file_data(__FILE__, array(
      'version' => 'Version',
      'textdomain' => 'Text Domain',
      'domainpath' => 'Domain Path'
    ));

    $this->version = $datas['version'];
    $this->textdomain = $datas['textdomain'];
    $this->domainpath = $datas['domainpath'];
  }

  public function load_plugin_textdomain()
  {
    load_plugin_textdomain($this->textdomain, false, dirname(plugin_basename(__FILE__)) . $this->domainpath);
  }

  // metaboxを表示させる
  public function add_meta_box()
  {
    $post_types = $this->get_post_types();

    foreach ($post_types as $post_type) {
      if ($this->is_post_type_enabled($post_type)) {
        add_meta_box('wpal', 'WP Applink', array($this, 'create_meta_box'), $post_type, 'side', 'high');
      }
    }
  }

  // 管理画面に設定画面を追加
  public function add_plugin_page()
  {
    add_options_page(
      'WP Applink',
      'WP Applink',
      'manage_options',
      'wpal-setting',
      array($this, 'create_admin_page')
    );
  }

  public function create_admin_page()
  {
?>
    <div class="wrap">
      <h2>WP Applink</h2>

      <?php
      global $parent_file;
      if ($parent_file != 'options-general.php') {
        require(ABSPATH . 'wp-admin/options-head.php');
      }
      ?>

      <form method="post" action="options.php">
        <?php
        settings_fields('wpal-setting');
        do_settings_sections('wpal-setting');
        submit_button();
        ?>
      </form>

      <p><?php echo __('Please read this document for setting options.', $this->textdomain); ?></p>
      <p><a class="button" href="http://e-joint.jp/works/wp-applink/"><?php echo __('Read the Document', $this->textdomain); ?></a></p>
    </div>
    <!--wrap-->
  <?php
  }

  public function page_init()
  {
    register_setting('wpal-setting', 'wpal-setting', array($this, 'sanitize'));
    add_settings_section('wpal-setting-section-id', '', '', 'wpal-setting');

    add_settings_field('token', __('PHG Token', $this->textdomain), array($this, 'token_callback'), 'wpal-setting', 'wpal-setting-section-id');
    add_settings_field('nocss', __('Do not use plugin\'s CSS', $this->textdomain), array($this, 'nocss_callback'), 'wpal-setting', 'wpal-setting-section-id');
    add_settings_field('country', __('Country', $this->textdomain), array($this, 'country_callback'), 'wpal-setting', 'wpal-setting-section-id');
    add_settings_field('cache', __('Cache limit', $this->textdomain), array($this, 'cache_callback'), 'wpal-setting', 'wpal-setting-section-id');
    add_settings_field('post-type', __('Post type to use', $this->textdomain), array($this, 'post_type_callback'), 'wpal-setting', 'wpal-setting-section-id');
    add_settings_field('clear-cache', __('Clear Cache', $this->textdomain), array($this, 'clear_cache_callback'), 'wpal-setting', 'wpal-setting-section-id');
  }

  public function sanitize($input)
  {
    $new_input = array();

    $new_input['nocss'] = $input['nocss'];
    $new_input['country'] = esc_attr($input['country']);
    $new_input['cache'] = esc_attr($input['cache']);
    $new_input['post-type'] = $input['post-type'];
    $new_input['clear-cache'] = $input['clear-cache'];

    if (isset($input['token']) && trim($input['token']) !== '') {
      $new_input['token'] = sanitize_text_field($input['token']);
    } else {
      add_settings_error('wpal-setting', 'token', __('Please enter a token.', $this->textdomain));
      // 値をDBの設定値に戻す
      $new_input['token'] = isset($this->options['token']) ? $this->options['token'] : '';
    }
    return $new_input;
  }

  public function token_callback()
  {
    $token = isset($this->options['token']) ? $this->options['token'] : '';
  ?>
    <input type="text" name="wpal-setting[token]" size="30" value="<?php echo esc_attr($token); ?>">
  <?php }

  public function nocss_callback()
  {
    $checked = isset($this->options['nocss']) ? checked($this->options['nocss'], 1, false) : '';
  ?><input type="checkbox" id="nocss" name="wpal-setting[nocss]" value="1" <?php echo $checked; ?>>

  <?php
  }
  public function country_callback()
  {
  ?>
    <select name="wpal-setting[country]">
      <?php $country = array_key_exists('country', $this->options) ? $this->options['country'] : ''; ?>
      <option value="ja" <?php selected($country, 'ja'); ?>><?php echo __('Japan(Default)', $this->textdomain); ?></option>
      <option value="us" <?php selected($country, 'us'); ?>><?php echo __('United States', $this->textdomain); ?></option>
    </select>
  <?php
  }

  public function cache_callback()
  {
  ?><select name="wpal-setting[cache]">
      <option value="1 day ago" <?php selected($this->options['cache'], '1 day ago'); ?>><?php echo __('1 day', $this->textdomain); ?></option>
      <option value="1 week ago" <?php selected($this->options['cache'], '1 week ago'); ?>><?php echo __('1 week', $this->textdomain); ?></option>
      <option value="1 month ago" <?php selected($this->options['cache'], '1 month ago'); ?>><?php echo __('1 month(Default)', $this->textdomain); ?></option>
      <option value="indefinitely" <?php selected($this->options['cache'], 'indefinitely'); ?>><?php echo __('Indefinitely', $this->textdomain); ?></option>
    </select>
  <?php
  }

  public function post_type_callback()
  {
    $post_types = $this->get_post_types();

    foreach ($post_types as $post_type) {
      $object = get_post_type_object($post_type);
      $label = $object->label;
      $checked = $this->is_post_type_enabled($post_type) ? 1 : 0;

      printf('<input type="checkbox" id="post-type" name="wpal-setting[post-type][]" value="%s"%s>%s ', $post_type, checked($checked, 1, false), $label);
    }
  }

  public function clear_cache_callback()
  {

    if (array_key_exists('clear-cache', $this->options) && $this->options['clear-cache']) {
      $this->clear_cache();
    }
  ?><input type="checkbox" name="wpal-setting[clear-cache]" value="1">
  <?php
  }

  public function clear_cache()
  {
    date_default_timezone_set('Asia/Tokyo');
    $cachefiles = scandir(CACHE_DIR);

    foreach ($cachefiles as $val) {
      $file = CACHE_DIR . $val;
      if (!is_file($file)) continue;
      // chmod($file, 0666);
      unlink($file);
    }
  }

  public function add_admin_js_css()
  {
    wp_enqueue_style('wpal', plugins_url('assets/css/admin.css', __FILE__), array(), $this->version);
    wp_enqueue_script('wpal', plugins_url('assets/js/bundle.js', __FILE__), array(), $this->version, true);
  }

  // スタイルシートの追加
  public function add_styles()
  {
    if (!isset($this->options['nocss']) || (isset($this->options['nocss']) && !$this->options['nocss'])) {
      wp_enqueue_style('wpal', plugins_url('assets/css/style.css', __FILE__), array(), $this->version);
    }
  }

  public function create_meta_box()
  {
    include dirname(__FILE__) . '/views/view-metabox.php';
  }

  private function get_post_types()
  {
    $args = array(
      'public'   => true
    );
    $output = 'names'; // names or objects, note names is the default
    $operator = 'and'; // 'and' or 'or'
    $post_types = get_post_types($args, $output, $operator);

    // 配列からattachmentを削除
    if (($key = array_search('attachment', $post_types)) !== false) {
      unset($post_types[$key]);
    }

    return $post_types;
  }

  private function is_post_type_enabled($post_type)
  {
    $post_types = $this->options['post-type'];
    if (is_null($post_types)) {
      return true;
    } else {
      return array_search($post_type, $post_types) !== false;
    }
  }

  public function wpal_ajax_search()
  {

    $search = new WP_Applink_Search();

    if (isset($_GET)) {
      $search->add_query_param('term', esc_html(urlencode($_GET['term'])));
      $search->add_query_param('media', esc_html($_GET['media']));
      $search->add_query_param('entity', esc_html($_GET['entity']));
      $search->add_query_param('limit', esc_html($_GET['limit']));
      $search->add_query_param('at', esc_html($_GET['at']));
      $search->add_shortcode_options('screenshot', esc_html($_GET['screenshot']));

      $search->setup_data();

      printf('<p>%s <b>%s</b> %s（%s）</p>', __('Search result', $this->textdomain), $search->search_result_count(), __('items.', $this->textdomain), $search->get_status());
      echo $search->search_result_html();

      if ($search->get_status() === 'API') {
        $search->save_cache();
      }
    }
    die();
  }

  // 検索結果のボタンを押したときの関数
  public function scripts()
  { ?>
    <script>
      function showCode(str) {
        var $code = document.getElementById('wpal-code')
        var $codeResult = document.getElementById('wpal-code-result')
        $code.style.display = 'block'
        $codeResult.value = decodeURIComponent(str)
        $codeResult.value = $codeResult.value.trim()
        $codeResult.select()
      }
    </script>
<?php
  }

  // ショートコードの定義
  public function wpal_shortcode($atts)
  {
    extract(shortcode_atts(array(
      'id' => null,
      'title' => null,
      'screenshot' => null
    ), $atts));

    $lookup = $this->lookup;

    $lookup->add_query_param('id', $id);
    $lookup->add_query_param('at', $this->options['token']);

    $param = array(
      'title' => $title,
      'screenshot' => $screenshot
    );

    $lookup->add_shortcode_options('title', $title);
    $lookup->add_shortcode_options('screenshot', $screenshot);

    return $lookup->display_applink($param);
  }
}

$wpal = new WP_Applink();
