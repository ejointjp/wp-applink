<?php
abstract class WP_Applink_Itunes
{

  // 検索のベースとなるURIを返す関数は必須
  abstract function base_uri();

  const APPNAME = 'wpal';
  // 検索結果のテキスト
  protected $text = null;
  // 検索クエリに使うための配列｡
  protected $query_array = array();
  // ショートコードのオプションに使うための配列
  protected $shortcode_options = array();
  // jsonの取得先。$this->search_url() または $cachename が入る
  protected $uri = null;

  protected $cachename;
  // API or Cache
  protected $status = 'API';
  // ショートコードによる出力かどうか
  protected $is_shortcode = false;

  public function __construct()
  {
    $this->set_datas();
    $this->select_country();
  }

  private function set_datas()
  {
    $datas = get_file_data(plugin_dir_path(__FILE__) . '../wp-applink.php', array(
      'version' => 'Version',
      'textdomain' => 'Text Domain',
      'domainpath' => 'Domain Path'
    ));

    $this->version = $datas['version'];
    $this->textdomain = $datas['textdomain'];
    $this->domainpath = $datas['domainpath'];
  }

  // 国を判別
  protected function select_country()
  {
    $options = get_option('wpal-setting');
    $country = $options['country'];

    if ($country != 'us') {
      $this->add_query_param('country', 'JP');
      $this->add_query_param('lang', 'ja_JP');
    }
  }

  // 検索用GETパラメータを追加
  public function add_query_param($key, $val)
  {
    $this->query_array[$key] = $val;
  }

  public function remove_query_param($key)
  {
    unset($this->query_array[$key]);
  }

  // 検索用クエリーストリングを出力
  public function search_query()
  {
    return http_build_query($this->query_array);
  }

  // 検索URLを出力
  public function search_uri()
  {
    $base_uri = $this->base_uri();
    return urldecode($base_uri . '?' . $this->search_query());
  }

  // 検索結果のJSONを取得
  public function get_result()
  {
    $uri = $this->get_uri();
    if ($json = file_get_contents($uri, true)) {
      $this->set_text($json);
    } else {
      return false;
    }
  }

  public function get_json()
  {
    return json_decode($this->text);
  }

  protected function set_text($text)
  {
    $this->text = $text;
  }

  public function get_text()
  {
    return $this->text;
  }

  public function set_uri($uri)
  {
    $this->uri = $uri;
  }

  public function get_uri()
  {
    return $this->uri;
  }

  public function enable_cache_mode()
  {
    $this->status = 'Cache';
  }

  public function get_status()
  {
    return $this->status;
  }

  public function save_cache()
  {
    if (!file_exists(CACHE_DIR)) mkdir(CACHE_DIR);

    $cachename = $this->get_cachename();
    return file_put_contents($cachename, $this->get_text());
  }

  protected function cachename_encode($name)
  {
    $string = implode('-', $this->query_array);
    $return = CACHE_DIR . $string . '.txt';
    return $return;
  }

  public function set_cachename($name)
  {
    $cachename = $this->cachename_encode($name);
    $this->cachename = $cachename;
  }

  public function get_cachename()
  {
    return $this->cachename;
  }

  public function cache_exists()
  {
    $cachename = $this->get_cachename();
    $exists = file_exists($cachename);
    if ($exists) $this->enable_cache_mode();
    return $exists;
  }

  // 検索結果のキャッシュがある場合、キャッシュのURI、なければAPIのURIを代入
  public function select_uri()
  {
    if ($this->cache_exists()) {
      $this->set_uri($this->get_cachename());
    } else {
      $this->set_uri($this->search_uri());
    }
  }

  public static function delete_cache()
  {
    date_default_timezone_set('Asia/Tokyo');
    // 削除期限
    $options = get_option('wpal-setting');
    $limit = $options['cache'];

    if ($limit !== 'indefinitely') {
      $expire = strtotime($limit);
      $cachefiles = scandir(CACHE_DIR);

      foreach ($cachefiles as $val) {
        $file = CACHE_DIR . $val;
        if (!is_file($file)) continue;
        $mod = filemtime($file);
        if ($mod < $expire) {
          // chmod($file, 0666);
          unlink($file);
        }
      }
    }
  }

  public function setup_data()
  {
    $cachename = $this->search_query();
    $this->set_cachename($cachename);
    $this->delete_cache();
    $this->select_uri();
    $this->get_result();
  }

  // ApplinkのHTMLを作成
  protected function applink_html($obj)
  {
    $prefix = $this->prefix();
    $item = $obj;
    $html = '';

    if ($item) {
      $mode = $this->mode($item);

      $html .= '<div class="' . self::APPNAME . ' ' . $prefix . $mode . '">';
      $html .= '<div class="' . $prefix . 'icon">';
      $html .= '<a href="' . $this->link($item) . '" target="itune_store">';
      $html .= '<img src="' . $this->icon($item) . '" alt="' . $this->name($item) . '">';
      $html .= '</a>';
      $html .= '</div>';
      $html .= '<div class="' . $prefix . 'content">';
      $html .= '<div class="' . $prefix . 'title">';
      $html .= '<a href="' . $this->link($item) . '" target="itune_store">' . $this->name($item) . '</a>';
      $html .= '</div>';
      $html .= '<div class="' . $prefix . 'datas">';
      $html .= '<span class="' . $prefix . 'data">' . $this->genres($item) . '</span><span class="' . $prefix . 'data">' . $this->price($item) . '</span>';

      if ($this->ios_universal($item)) {
        $html .= '<span class="' . $prefix . 'data">' . $this->ios_universal($item) . '</span>';
      }
      if ($mode != 'software' && $mode != 'mac-software') {
        $html .= '<span class="' . $prefix . 'data"><a href="' . $this->link($item, 'artistViewUrl') . '" target="itune_store">' . $this->exists($item, 'artistName') . '</a></span>';
      }
      if ($mode == 'song') {
        $html .= '<span class="' . $prefix . 'data">In Album: <a href="' . $this->link($item, 'collectionViewUrl') . '" target="itune_store">' . $this->exists($item, 'collectionName') . '</a></span>';
      }

      $html .= '</div>';
      $html .= '<div><a class="' . $prefix . 'btn" href="' . $this->link($item) . '" target="itune_store">' . $this->link_btn_label($mode) . '</a></div>';
      $html .= '</div>';

      if ($this->screenshot_count() > 0) {
        $html .= '<figure class="' . $prefix . 'screenshots">';
        $html .= '<figcaption>Screenshots</figcaption>';

        $i = 0;
        foreach ($this->screenshot_urls($item) as $ss) {
          if ($i < $this->screenshot_max_count($item)) {
            $html .= '<img src="' . $ss . '">';
            $i++;
          } else {
            break;
          }
        }
        $html .= '</figure>';
      }
      $html .= '</div>';

      if ($this->is_shortcode()) {
        $html .= '<!-- ' . $this->get_status() . '-->';
      }

      $html .= "\n\n";

      return $html;
    }
  }

  protected function prefix()
  {
    return self::APPNAME . '-';
  }

  protected function screenshot_urls($obj)
  {
    if (property_exists($obj, 'screenshotUrls')) {
      return $obj->screenshotUrls;
    } elseif (property_exists($obj, 'ipadScreenshotUrls')) {
      return $obj->ipadScreenshotUrls;
    }
  }

  protected function screenshot_count()
  {

    if (isset($this->shortcode_options['screenshot'])) {
      $num = (int) $this->shortcode_options['screenshot'];
      if (!is_numeric($num)) {
        $num = 0;
      }
    } else {
      $num = 0;
    }
    return $num;
  }

  protected function screenshot_max_count($obj)
  {
    $setting_num = $this->screenshot_count();
    $app_screenshots_num = count($this->screenshot_urls($obj));
    if ($setting_num <= $app_screenshots_num) {
      return $setting_num;
    } else {
      return $app_screenshots_num;
    }
  }

  // プロパティの出力をよしなにする
  protected function exists($obj, $property)
  {
    if (property_exists($obj, $property)) {
      return $obj->$property;
    }
  }

  // アイテムの配列とそうでない場合の出力をよしなにする
  protected function array_implode($item, $separator = ', ')
  {
    if (is_array($item)) {
      return implode($separator, $item);
    } else {
      return $item;
    }
  }

  protected function icon($obj)
  {

    if (property_exists($obj, 'artworkUrl100')) {
      return $obj->artworkUrl100;
    } elseif (property_exists($obj, 'artworkUrl512')) {
      return $obj->artworkUrl512;
    } elseif (property_exists($obj, 'artworkUrl60')) {
      return $obj->artworkUrl60;
    } elseif (property_exists($obj, 'artworkUrl30')) {
      return $obj->artworkUrl30;
    }
  }

  protected function id($obj)
  {
    if (property_exists($obj, 'trackId')) {
      return $obj->trackId;
    } elseif (property_exists($obj, 'collectionId')) {
      return $obj->collectionId;
    }
  }

  protected function link($obj, $property = 'trackViewUrl')
  {
    if (property_exists($obj, $property)) {
      return $obj->$property;
    } elseif (property_exists($obj, 'collectionViewUrl')) {
      return $obj->collectionViewUrl;
    }
  }

  protected function name($obj)
  {

    $name = array();

    if (property_exists($obj, 'trackName')) {
      $name[] = $obj->trackName;
    } elseif (property_exists($obj, 'collectionName')) {
      $name[] = $obj->collectionName;
    }

    return implode(' ', $name);
  }

  protected function genres($obj)
  {

    if (property_exists($obj, 'genres')) {

      $return = $this->array_implode($obj->genres);
      return $return;
    } elseif (property_exists($obj, 'primaryGenreName')) {
      $return = $this->array_implode($obj->primaryGenreName);
      return $return;
    }
  }

  protected function price($obj)
  {

    if (property_exists($obj, 'formattedPrice')) {
      return $obj->formattedPrice;
    } elseif (property_exists($obj, 'trackPrice')) {
      return $this->format_price($obj->trackPrice);
    } elseif (property_exists($obj, 'collectionPrice')) {
      return $this->format_price($obj->collectionPrice);
    }
  }

  protected function format_price($int)
  {
    if ($int == 0) {
      return __('Free', $this->textdomain);
    } elseif ($int > 0) {
      return '¥' . number_format($int);
    }
  }

  protected function ios_universal($obj)
  {

    if (property_exists($obj, 'features') && in_array('iosUniversal', $obj->features)) {
      return __('iOS Universal', $this->textdomain);
    }
  }

  protected function mode($obj)
  {
    if (property_exists($obj, 'kind')) {
      $return =  $obj->kind;
    } elseif (property_exists($obj, 'collectionType')) {
      $return = $obj->collectionType;
    } elseif (property_exists($obj, 'wrapperType')) {
      $return = $obj->wrapperType;
    }

    if (isset($return)) {
      return mb_strtolower($return);
    }
  }

  protected function link_btn_label($mode)
  {

    if ($mode == 'software') {
      return 'App Store';
    } elseif ($mode == 'mac-software') {
      return 'Mac App Store';
    } elseif ($mode == 'ebook') {
      return 'iBooks Store';
    } else {
      return 'iTunes Store';
    }
  }

  // スクリーンショットの枚数などのオプションを追加するためのもの
  public function add_shortcode_options($key, $val)
  {
    $this->shortcode_options[$key] = $val;
  }

  protected function enable_shortcode()
  {
    $this->is_shortcode = true;
  }

  public function is_shortcode()
  {
    return $this->is_shortcode;
  }
}
