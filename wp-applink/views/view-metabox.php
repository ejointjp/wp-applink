<?php
$select = array(
	'software' => __('iPhone App', 'wp-applink'),
	'iPadSoftware' => __('iPad App', 'wp-applink'),
	'macSoftware' => __('Mac App', 'wp-applink'),
	'ebook' => __('iBooks', 'wp-applink'),
	'song' => __('Music Track', 'wp-applink'),
	'album' => __('Music Album', 'wp-applink'),
	'musicVideo' => __('Music Video', 'wp-applink'),
	'movie' => __('Movie', 'wp-applink'),
	'podcast' => __('Podcast', 'wp-applink'),
	'audiobook' => __('Audiobook', 'wp-applink')
);
$limit = array(1, 3, 5, 10, 20, 30, 50, 100);
?>

<div id="wpal-form" class="wpal-form">

	<label>
		<input id="wpal-term" class="wpal-term" type="text" name="term" placeholder="<?php echo __('Keywords', 'wp-applink'); ?>">
	</label>

	<label>
		<select id="wpal-select" name="select">
			<?php
				foreach($select as $key => $val){
					printf('<option value="%s">%s</option>', $key, $val);
				}
			?>
		</select>
	</label>

  <label>
    <span class="wpal-label"><?php echo __('Screenshots', 'wp-applink'); ?></span>
    <select id="wpal-screenshot" class="wpal-screenshot" name="screenshot">
			<?php for($i = 0; $i < 6; $i++){
				printf('<option value="%d">%d</option>', $i, $i);
			} ?>
    </select>
  </label>

	<label>
		<span class="wpal-label"><?php echo __('Number of searches', 'wp-applink'); ?></span>
		<select id="wpal-limit" class="wpal-limit" name="limit">
		<?php foreach($limit as $item){
			$selected = $item === 10 ? ' selected' : null;
			printf('<option value="%d"%s>%d</option>', $item, $selected, $item);
		}?>
		</select>
	</label>

	<input type="hidden" name="media" id="wpal-media">
  <input type="hidden" name="entity" id="wpal-entity">
	<?php $options = get_option('wpal-setting');
	$token = $options['token'];
	?>
  <input type="hidden" name="at" value="<?php echo $token; ?>" id="wpal-token">
  <div id="wpal-submit" class="wpal-submit button button-primary button-large"><?php echo __('Search'); ?></div>
</div>

<div id="wpal-code" class="wpal-code"><div class="wpal-code-label"><?php echo __('Copy the code below and paste it', 'wp-applink'); ?></div><textarea id="wpal-code-result" class="wpal-code-result"></textarea></div>

<div id="wpal-loader" class="wpal-loader">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
		<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
		</rect>
		<rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
		</rect>
		<rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
			<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
		</rect>
	</svg>
</div>

<div id="wpal-status"></div>
<div id="wpal-result" class="wpal-result"></div>
