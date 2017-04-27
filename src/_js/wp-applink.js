(function($){

  $(function(){
  	var _locale_ = document.getElementsByTagName('html')[0].getAttribute('lang');
  	var $status = $('#wpal-status');
  	var $select = $('#wpal-select');
  	var $media = $('#wpal-media');
  	var $entity = $('#wpal-entity');
  	var $screenshot = $('#wpal-screenshot');
  	var $limit = $('#wpal-limit');
  	var $term = $('#wpal-term');
  	var $result = $('#wpal-result');
  	var $loader = $('#wpal-loader');
  	var $submit = $('#wpal-submit');
  	var term = $term.val();
  	var jqxhr;

  	set_hidden_val();

  	$submit.on('click', function(){
  		ajax_send();
  	});

  	$select.on('change', function(){
  		set_hidden_val();
      ajax_send();
    });

  	$([$limit[0], $screenshot[0]]).on('change', function(){
  		ajax_send();
  	});

  	$term.on('keyup', function(){
  		ajax_send();

  	}).on('keydown', function(e) {
  		//Enterキーを無効
  		if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
  			return false;
  		} else {
  			return true;
  		}
  	});


  	function ajax_send(){

  		term = $term.val();

  		if (jqxhr) {
  			jqxhr.abort(); //ajax()実行前にjqxhrオブジェクトを判定し、オブジェクトが存在すればabort()を実行
  		}

  		if(term === ''){
  			$loader.slideUp(100);
  			if(_locale_ === 'en' || _locale_ ==='en_US'){
  				$result.text('Please Enter search keywords.');
  			} else {
  				$result.text('検索キーワードを入力してください');
  			}
  			$term.focus();
  		}

  		else{

  			$result.text('');
  			$loader.slideDown(100);

  			jqxhr = $.ajax({
  				url: ajaxurl,
  				// data: $form.serialize(),
  				data: {
  					media: $media.val(),
  					entity: $entity.val(),
  					screenshot: $screenshot.val(),
  					limit: $limit.val(),
  					term: $term.val(),
  					at: $('#wpal-token').val(),
  					action: 'wpal_ajax_search'
  				},
  				type: 'GET'
  			})

  			.done(function(data){
  				$result.html(data);
          $loader.slideUp(100);
  			})

  			.fail(function(jqXHR, textStatus){
  				if(textStatus !== 'abort'){
  					if(_locale_ === 'en' || _locale_ ==='en_US'){
  						$status.text('Connection failed.');
  					} else {
  						$status.text('接続に失敗しました。');
  					}
  					$loader.slideUp(100);
  				}
  			});
  		}
  	}


  	function set_hidden_val(){

  		selectVal = $select.val();

      if(selectVal == 'iPadSoftware' || selectVal == 'macSoftware'){
        $media.val('software');
        $entity.val(selectVal);
      }else if(selectVal == 'song' || selectVal == 'album'){
        $media.val('music');
        $entity.val(selectVal);
      }

      else{
        $media.val(selectVal);
        $entity.val('');
      }
  	}
  });

})(jQuery);
