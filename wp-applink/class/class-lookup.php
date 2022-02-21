<?php
include_once dirname(__FILE__) . '/class-itunes.php';

class WP_Applink_Lookup extends WP_Applink_Itunes {
  //検索のベースとなるURI
  public function base_uri(){
    return 'https://itunes.apple.com/lookup';
  }

  // Applinkを出力
  public function display_applink($param){
    $this->setup_data();

    //アプリがなければ警告メッセージを出力
    if($this->get_json()->resultCount === 0){
      $title = $param['title'];
      $title = is_null($title) ? '' : '「' . $title . '」';

      return '<p class="' . $this->prefix() . 'message">' . $title . __('Link not found.', $this->textdomain) . ': (WP Applink)</p>';
    } else {
      //アプリがあればHTMLを出力
      if($this->get_status() === 'API'){
        $this->save_cache();
      }

      $this->enable_shortcode();
      $app = $this->get_json()->results[0];
      return $this->applink_html($app);
    }
  }
}
