<?php
include_once dirname(__FILE__) . '/class-itunes.php';

class Search extends Itunes
{

  //検索のベースとなるURI
  public function base_uri(){
    return 'https://itunes.apple.com/search';
  }

  //検索結果の件数を取得
  public function search_result_count(){
    $obj = $this->get_result_json();
    return $obj->resultCount;
  }

  //検索結果のHTMLを作成｡metabox内で使用される
  public function search_result_html(){
    $prefix = $this->prefix();
    $result = $this->get_result_json()->results;

    if($result){

      $html = '<div class="' . $prefix . 'wrapper">';

      foreach($result as $item){
        $mode = $this->mode($item);

        $html .= '<div class="' . Itunes::APPNAME . ' ' . $prefix . $mode . '">';
        $html .= '<div class="' . $prefix . 'icon">';
        $html .= '<a href="' . $this->link($item) . '" target="itune_store">';
        $html .= '<img src="' . $this->icon($item) . '" alt="' . $this->name($item) . '">';
        $html .= '</a>';
        $html .= '</div>';
        $html .= '<div class="' . $prefix . 'title">' . $this->name($item) . '</div>';

        $html .= '<div class="wpal-btn button button-small" onClick=" send_to_parent_editor(\'' .  rawurlencode($this->generate_shortcode($this->id($item), $this->name($item))) . '\')">' . __('Shortcode', 'wp-applink') . '</div>';
        $html .= '<div class="wpal-btn button button-small" onClick=" send_to_parent_editor(\'' .  rawurlencode($this->applink_html($item)) . '\')">' . __('HTML Tag', 'wp-applink') . '</div>';

        $html .= '</div>';
      }
      $html .= '</div>';
      return $html;
    }
  }

  //ショートコードそのものを生成する
  private function generate_shortcode($trackId, $trackName){
    $param = array(
      'id' => $trackId,
      'title' => $trackName
    );

    $param += $this->shortcode_options;
    $param_output = '';
    foreach($param as $key => $val){
      if($val){
        $param_output .= ' ' . $key . '=' . '"' . $val . '"';
      }
    }

    return '[applink' . $param_output . ']' . "\n\n";
  }
}
