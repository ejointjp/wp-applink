<?php
include_once dirname(__FILE__) . '/class-itunes.php';

class WP_Applink_Lookup extends WP_Applink_Itunes {
  //検索のベースとなるURI
  public function base_uri(){
    return 'https://itunes.apple.com/lookup';
  }

  // Applinkを出力
  public function display_applink($param){
    // $this->options = get_option('wpal-setting');
    // $search_query = $this->search_query();
    // $this->remove_query_param('at');
    // $cachename = $this->search_query();
    // $this->set_cachename($cachename);
    //
    // $this->add_query_param('at', $this->options['token']);
    $this->setup_data();

    $app = $this->get_json()->results[0];
    //アプリがなければ警告メッセージを出力
    if(!$app){
      $title = $param['title'];
      $title = is_null($title) ? '' : '「' . $title . '」';

      return '<p class="' . $this->prefix() . 'message">' . $title . __('Link not found.', $this->textdomain) . ': (WP Applink)</p>';
    } else {
      //アプリがあればHTMLを出力
      if($this->get_status() === 'API'){
        $this->save_cache();
      }

      $this->enable_shortcode();
      return $this->applink_html($app);
    }
  }
}
