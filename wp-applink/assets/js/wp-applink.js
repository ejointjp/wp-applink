/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./_src/js/wp-applink.js ***!
  \*******************************/
/***/ (function(module, exports) {

eval("(function($){\n\n  $(function(){\n  \tvar _locale_ = document.getElementsByTagName('html')[0].getAttribute('lang');\n  \tvar $status = $('#wpal-status');\n  \tvar $select = $('#wpal-select');\n  \tvar $media = $('#wpal-media');\n  \tvar $entity = $('#wpal-entity');\n  \tvar $screenshot = $('#wpal-screenshot');\n  \tvar $limit = $('#wpal-limit');\n  \tvar $term = $('#wpal-term');\n  \tvar $result = $('#wpal-result');\n  \tvar $loader = $('#wpal-loader');\n  \tvar $submit = $('#wpal-submit');\n\n  \tvar term = $term.val();\n  \tvar jqxhr;\n    var timer = false;\n    var suspension = 1000; // keyupイベント発動の猶予時間（s）\n\n  \tset_hidden_val();\n\n  \t$submit.on('click', function(){\n  \t\tajax_send();\n  \t});\n\n    $term.on('keydown', function(e){\n      // 検索ワード入力時にEnterで検索を実行。\n      if((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)){\n        e.preventDefault();\n        ajax_send();\n\n      } else {\n        return true;\n      }\n    });\n\n\n  \tfunction ajax_send(){\n\n  \t\tterm = $term.val();\n\n  \t\tif (jqxhr) {\n  \t\t\tjqxhr.abort(); //ajax()実行前にjqxhrオブジェクトを判定し、オブジェクトが存在すればabort()を実行\n  \t\t}\n\n  \t\tif(term === ''){\n  \t\t\t$loader.slideUp(100);\n  \t\t\tif(_locale_ === 'en' || _locale_ ==='en_US'){\n  \t\t\t\t$result.text('Please Enter search keywords.');\n  \t\t\t} else {\n  \t\t\t\t$result.text('検索キーワードを入力してください');\n  \t\t\t}\n  \t\t\t$term.focus();\n  \t\t}\n\n  \t\telse{\n\n  \t\t\t$result.text('');\n  \t\t\t$loader.slideDown(100);\n\n  \t\t\tjqxhr = $.ajax({\n  \t\t\t\turl: ajaxurl,\n  \t\t\t\t// data: $form.serialize(),\n  \t\t\t\tdata: {\n  \t\t\t\t\tmedia: $media.val(),\n  \t\t\t\t\tentity: $entity.val(),\n  \t\t\t\t\tscreenshot: $screenshot.val(),\n  \t\t\t\t\tlimit: $limit.val(),\n  \t\t\t\t\tterm: $term.val(),\n  \t\t\t\t\tat: $('#wpal-token').val(),\n  \t\t\t\t\taction: 'wpal_ajax_search'\n  \t\t\t\t},\n  \t\t\t\ttype: 'GET'\n  \t\t\t})\n\n  \t\t\t.done(function(data){\n  \t\t\t\t$result.html(data);\n          $loader.slideUp(100);\n  \t\t\t})\n\n  \t\t\t.fail(function(jqXHR, textStatus){\n  \t\t\t\tif(textStatus !== 'abort'){\n  \t\t\t\t\tif(_locale_ === 'en' || _locale_ ==='en_US'){\n  \t\t\t\t\t\t$status.text('Connection failed.');\n  \t\t\t\t\t} else {\n  \t\t\t\t\t\t$status.text('接続に失敗しました。');\n  \t\t\t\t\t}\n  \t\t\t\t\t$loader.slideUp(100);\n  \t\t\t\t}\n  \t\t\t});\n  \t\t}\n      console.log('発動！');\n  \t}\n\n\n  \tfunction set_hidden_val(){\n\n  \t\tselectVal = $select.val();\n\n      if(selectVal == 'iPadSoftware' || selectVal == 'macSoftware'){\n        $media.val('software');\n        $entity.val(selectVal);\n      }else if(selectVal == 'song' || selectVal == 'album'){\n        $media.val('music');\n        $entity.val(selectVal);\n      }\n\n      else{\n        $media.val(selectVal);\n        $entity.val('');\n      }\n  \t}\n  });\n\n})(jQuery);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL19zcmMvanMvd3AtYXBwbGluay5qcz81ODZlIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKXtcblxuICAkKGZ1bmN0aW9uKCl7XG4gIFx0dmFyIF9sb2NhbGVfID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKTtcbiAgXHR2YXIgJHN0YXR1cyA9ICQoJyN3cGFsLXN0YXR1cycpO1xuICBcdHZhciAkc2VsZWN0ID0gJCgnI3dwYWwtc2VsZWN0Jyk7XG4gIFx0dmFyICRtZWRpYSA9ICQoJyN3cGFsLW1lZGlhJyk7XG4gIFx0dmFyICRlbnRpdHkgPSAkKCcjd3BhbC1lbnRpdHknKTtcbiAgXHR2YXIgJHNjcmVlbnNob3QgPSAkKCcjd3BhbC1zY3JlZW5zaG90Jyk7XG4gIFx0dmFyICRsaW1pdCA9ICQoJyN3cGFsLWxpbWl0Jyk7XG4gIFx0dmFyICR0ZXJtID0gJCgnI3dwYWwtdGVybScpO1xuICBcdHZhciAkcmVzdWx0ID0gJCgnI3dwYWwtcmVzdWx0Jyk7XG4gIFx0dmFyICRsb2FkZXIgPSAkKCcjd3BhbC1sb2FkZXInKTtcbiAgXHR2YXIgJHN1Ym1pdCA9ICQoJyN3cGFsLXN1Ym1pdCcpO1xuXG4gIFx0dmFyIHRlcm0gPSAkdGVybS52YWwoKTtcbiAgXHR2YXIganF4aHI7XG4gICAgdmFyIHRpbWVyID0gZmFsc2U7XG4gICAgdmFyIHN1c3BlbnNpb24gPSAxMDAwOyAvLyBrZXl1cOOCpOODmeODs+ODiOeZuuWLleOBrueMtuS6iOaZgumWk++8iHPvvIlcblxuICBcdHNldF9oaWRkZW5fdmFsKCk7XG5cbiAgXHQkc3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIFx0XHRhamF4X3NlbmQoKTtcbiAgXHR9KTtcblxuICAgICR0ZXJtLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAvLyDmpJzntKLjg6/jg7zjg4nlhaXlipvmmYLjgatFbnRlcuOBp+aknOe0ouOCkuWun+ihjOOAglxuICAgICAgaWYoKGUud2hpY2ggJiYgZS53aGljaCA9PT0gMTMpIHx8IChlLmtleUNvZGUgJiYgZS5rZXlDb2RlID09PSAxMykpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFqYXhfc2VuZCgpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gIFx0ZnVuY3Rpb24gYWpheF9zZW5kKCl7XG5cbiAgXHRcdHRlcm0gPSAkdGVybS52YWwoKTtcblxuICBcdFx0aWYgKGpxeGhyKSB7XG4gIFx0XHRcdGpxeGhyLmFib3J0KCk7IC8vYWpheCgp5a6f6KGM5YmN44GranF4aHLjgqrjg5bjgrjjgqfjgq/jg4jjgpLliKTlrprjgZfjgIHjgqrjg5bjgrjjgqfjgq/jg4jjgYzlrZjlnKjjgZnjgozjgbBhYm9ydCgp44KS5a6f6KGMXG4gIFx0XHR9XG5cbiAgXHRcdGlmKHRlcm0gPT09ICcnKXtcbiAgXHRcdFx0JGxvYWRlci5zbGlkZVVwKDEwMCk7XG4gIFx0XHRcdGlmKF9sb2NhbGVfID09PSAnZW4nIHx8IF9sb2NhbGVfID09PSdlbl9VUycpe1xuICBcdFx0XHRcdCRyZXN1bHQudGV4dCgnUGxlYXNlIEVudGVyIHNlYXJjaCBrZXl3b3Jkcy4nKTtcbiAgXHRcdFx0fSBlbHNlIHtcbiAgXHRcdFx0XHQkcmVzdWx0LnRleHQoJ+aknOe0ouOCreODvOODr+ODvOODieOCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhCcpO1xuICBcdFx0XHR9XG4gIFx0XHRcdCR0ZXJtLmZvY3VzKCk7XG4gIFx0XHR9XG5cbiAgXHRcdGVsc2V7XG5cbiAgXHRcdFx0JHJlc3VsdC50ZXh0KCcnKTtcbiAgXHRcdFx0JGxvYWRlci5zbGlkZURvd24oMTAwKTtcblxuICBcdFx0XHRqcXhociA9ICQuYWpheCh7XG4gIFx0XHRcdFx0dXJsOiBhamF4dXJsLFxuICBcdFx0XHRcdC8vIGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxuICBcdFx0XHRcdGRhdGE6IHtcbiAgXHRcdFx0XHRcdG1lZGlhOiAkbWVkaWEudmFsKCksXG4gIFx0XHRcdFx0XHRlbnRpdHk6ICRlbnRpdHkudmFsKCksXG4gIFx0XHRcdFx0XHRzY3JlZW5zaG90OiAkc2NyZWVuc2hvdC52YWwoKSxcbiAgXHRcdFx0XHRcdGxpbWl0OiAkbGltaXQudmFsKCksXG4gIFx0XHRcdFx0XHR0ZXJtOiAkdGVybS52YWwoKSxcbiAgXHRcdFx0XHRcdGF0OiAkKCcjd3BhbC10b2tlbicpLnZhbCgpLFxuICBcdFx0XHRcdFx0YWN0aW9uOiAnd3BhbF9hamF4X3NlYXJjaCdcbiAgXHRcdFx0XHR9LFxuICBcdFx0XHRcdHR5cGU6ICdHRVQnXG4gIFx0XHRcdH0pXG5cbiAgXHRcdFx0LmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gIFx0XHRcdFx0JHJlc3VsdC5odG1sKGRhdGEpO1xuICAgICAgICAgICRsb2FkZXIuc2xpZGVVcCgxMDApO1xuICBcdFx0XHR9KVxuXG4gIFx0XHRcdC5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzKXtcbiAgXHRcdFx0XHRpZih0ZXh0U3RhdHVzICE9PSAnYWJvcnQnKXtcbiAgXHRcdFx0XHRcdGlmKF9sb2NhbGVfID09PSAnZW4nIHx8IF9sb2NhbGVfID09PSdlbl9VUycpe1xuICBcdFx0XHRcdFx0XHQkc3RhdHVzLnRleHQoJ0Nvbm5lY3Rpb24gZmFpbGVkLicpO1xuICBcdFx0XHRcdFx0fSBlbHNlIHtcbiAgXHRcdFx0XHRcdFx0JHN0YXR1cy50ZXh0KCfmjqXntprjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgIInKTtcbiAgXHRcdFx0XHRcdH1cbiAgXHRcdFx0XHRcdCRsb2FkZXIuc2xpZGVVcCgxMDApO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fSk7XG4gIFx0XHR9XG4gICAgICBjb25zb2xlLmxvZygn55m65YuV77yBJyk7XG4gIFx0fVxuXG5cbiAgXHRmdW5jdGlvbiBzZXRfaGlkZGVuX3ZhbCgpe1xuXG4gIFx0XHRzZWxlY3RWYWwgPSAkc2VsZWN0LnZhbCgpO1xuXG4gICAgICBpZihzZWxlY3RWYWwgPT0gJ2lQYWRTb2Z0d2FyZScgfHwgc2VsZWN0VmFsID09ICdtYWNTb2Z0d2FyZScpe1xuICAgICAgICAkbWVkaWEudmFsKCdzb2Z0d2FyZScpO1xuICAgICAgICAkZW50aXR5LnZhbChzZWxlY3RWYWwpO1xuICAgICAgfWVsc2UgaWYoc2VsZWN0VmFsID09ICdzb25nJyB8fCBzZWxlY3RWYWwgPT0gJ2FsYnVtJyl7XG4gICAgICAgICRtZWRpYS52YWwoJ211c2ljJyk7XG4gICAgICAgICRlbnRpdHkudmFsKHNlbGVjdFZhbCk7XG4gICAgICB9XG5cbiAgICAgIGVsc2V7XG4gICAgICAgICRtZWRpYS52YWwoc2VsZWN0VmFsKTtcbiAgICAgICAgJGVudGl0eS52YWwoJycpO1xuICAgICAgfVxuICBcdH1cbiAgfSk7XG5cbn0pKGpRdWVyeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL19zcmMvanMvd3AtYXBwbGluay5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);