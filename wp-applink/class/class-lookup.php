<?php
include_once dirname(__FILE__) . '/class-itunes.php';

class WP_Applink_Lookup extends WP_Applink_Itunes
{

  //検索のベースとなるURI
  public function base_uri(){
    return 'https://itunes.apple.com/lookup';
  }

  //Applinkを出力
  public function display_applink($param){
    $app = $this->get_result()->results[0];
    //アプリがなければ警告メッセージを出力
    if(!$app){
      $title = $param['title'];
      $title = is_null($title) ? '' : '「' . $title . '」';

      return '<p class="' . $this->prefix() . 'message">' . $title . __('Link not found.', 'wp-applink') . ': (WP Applink)</p>';
    } else {
      //アプリがあればHTMLを出力
      return $this->applink_html($app);
    }
  }

}
