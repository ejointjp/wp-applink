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

eval("(function($){\n\n  $(function(){\n    var _locale_ = document.getElementsByTagName('html')[0].getAttribute('lang');\n    var $status = $('#wpal-status');\n    var $select = $('#wpal-select');\n    var $media = $('#wpal-media');\n    var $entity = $('#wpal-entity');\n    var $screenshot = $('#wpal-screenshot');\n    var $limit = $('#wpal-limit');\n    var $term = $('#wpal-term');\n    var $result = $('#wpal-result');\n    var $loader = $('#wpal-loader');\n    var $submit = $('#wpal-submit');\n\n    var term = $term.val();\n    var jqxhr;\n\n    set_hidden_val();\n\n    $submit.on('click', function(){\n      ajax_send();\n    });\n\n    $select.on('change', function(){\n      set_hidden_val();\n    });\n\n    $term.on('keydown', function(e){\n      // 検索ワード入力時にEnterで検索を実行。\n      if((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)){\n        e.preventDefault();\n        ajax_send();\n\n      } else {\n        return true;\n      }\n    });\n\n\n    function ajax_send(){\n\n      term = $term.val();\n\n      if (jqxhr) {\n        jqxhr.abort(); //ajax()実行前にjqxhrオブジェクトを判定し、オブジェクトが存在すればabort()を実行\n      }\n\n      if(term === ''){\n        $loader.slideUp(100);\n        if(_locale_ === 'en' || _locale_ ==='en_US'){\n          $result.text('Please Enter search keywords.');\n        } else {\n          $result.text('検索キーワードを入力してください');\n        }\n        $term.focus();\n      }\n\n      else{\n\n        $result.text('');\n        $loader.slideDown(100);\n\n        jqxhr = $.ajax({\n          url: ajaxurl,\n          // data: $form.serialize(),\n          data: {\n            media: $media.val(),\n            entity: $entity.val(),\n            screenshot: $screenshot.val(),\n            limit: $limit.val(),\n            term: $term.val(),\n            at: $('#wpal-token').val(),\n            action: 'wpal_ajax_search'\n          },\n          type: 'GET'\n        })\n\n        .done(function(data){\n          $result.html(data);\n          $loader.slideUp(100);\n        })\n\n        .fail(function(jqXHR, textStatus){\n          if(textStatus !== 'abort'){\n            if(_locale_ === 'en' || _locale_ ==='en_US'){\n              $status.text('Connection failed.');\n            } else {\n              $status.text('接続に失敗しました。');\n            }\n            $loader.slideUp(100);\n          }\n        });\n      }\n      console.log('発動！');\n    }\n\n\n    function set_hidden_val(){\n\n      var selectVal = $select.val();\n\n      if(selectVal == 'iPadSoftware' || selectVal == 'macSoftware'){\n        $media.val('software');\n        $entity.val(selectVal);\n      }else if(selectVal == 'song' || selectVal == 'album'){\n        $media.val('music');\n        $entity.val(selectVal);\n      }\n\n      else{\n        $media.val(selectVal);\n        $entity.val('');\n      }\n    }\n  });\n\n})(jQuery);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL19zcmMvanMvd3AtYXBwbGluay5qcz81ODZlIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKXtcblxuICAkKGZ1bmN0aW9uKCl7XG4gICAgdmFyIF9sb2NhbGVfID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKTtcbiAgICB2YXIgJHN0YXR1cyA9ICQoJyN3cGFsLXN0YXR1cycpO1xuICAgIHZhciAkc2VsZWN0ID0gJCgnI3dwYWwtc2VsZWN0Jyk7XG4gICAgdmFyICRtZWRpYSA9ICQoJyN3cGFsLW1lZGlhJyk7XG4gICAgdmFyICRlbnRpdHkgPSAkKCcjd3BhbC1lbnRpdHknKTtcbiAgICB2YXIgJHNjcmVlbnNob3QgPSAkKCcjd3BhbC1zY3JlZW5zaG90Jyk7XG4gICAgdmFyICRsaW1pdCA9ICQoJyN3cGFsLWxpbWl0Jyk7XG4gICAgdmFyICR0ZXJtID0gJCgnI3dwYWwtdGVybScpO1xuICAgIHZhciAkcmVzdWx0ID0gJCgnI3dwYWwtcmVzdWx0Jyk7XG4gICAgdmFyICRsb2FkZXIgPSAkKCcjd3BhbC1sb2FkZXInKTtcbiAgICB2YXIgJHN1Ym1pdCA9ICQoJyN3cGFsLXN1Ym1pdCcpO1xuXG4gICAgdmFyIHRlcm0gPSAkdGVybS52YWwoKTtcbiAgICB2YXIganF4aHI7XG5cbiAgICBzZXRfaGlkZGVuX3ZhbCgpO1xuXG4gICAgJHN1Ym1pdC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgYWpheF9zZW5kKCk7XG4gICAgfSk7XG5cbiAgICAkc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgc2V0X2hpZGRlbl92YWwoKTtcbiAgICB9KTtcblxuICAgICR0ZXJtLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAvLyDmpJzntKLjg6/jg7zjg4nlhaXlipvmmYLjgatFbnRlcuOBp+aknOe0ouOCkuWun+ihjOOAglxuICAgICAgaWYoKGUud2hpY2ggJiYgZS53aGljaCA9PT0gMTMpIHx8IChlLmtleUNvZGUgJiYgZS5rZXlDb2RlID09PSAxMykpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFqYXhfc2VuZCgpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gYWpheF9zZW5kKCl7XG5cbiAgICAgIHRlcm0gPSAkdGVybS52YWwoKTtcblxuICAgICAgaWYgKGpxeGhyKSB7XG4gICAgICAgIGpxeGhyLmFib3J0KCk7IC8vYWpheCgp5a6f6KGM5YmN44GranF4aHLjgqrjg5bjgrjjgqfjgq/jg4jjgpLliKTlrprjgZfjgIHjgqrjg5bjgrjjgqfjgq/jg4jjgYzlrZjlnKjjgZnjgozjgbBhYm9ydCgp44KS5a6f6KGMXG4gICAgICB9XG5cbiAgICAgIGlmKHRlcm0gPT09ICcnKXtcbiAgICAgICAgJGxvYWRlci5zbGlkZVVwKDEwMCk7XG4gICAgICAgIGlmKF9sb2NhbGVfID09PSAnZW4nIHx8IF9sb2NhbGVfID09PSdlbl9VUycpe1xuICAgICAgICAgICRyZXN1bHQudGV4dCgnUGxlYXNlIEVudGVyIHNlYXJjaCBrZXl3b3Jkcy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkcmVzdWx0LnRleHQoJ+aknOe0ouOCreODvOODr+ODvOODieOCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhCcpO1xuICAgICAgICB9XG4gICAgICAgICR0ZXJtLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGVsc2V7XG5cbiAgICAgICAgJHJlc3VsdC50ZXh0KCcnKTtcbiAgICAgICAgJGxvYWRlci5zbGlkZURvd24oMTAwKTtcblxuICAgICAgICBqcXhociA9ICQuYWpheCh7XG4gICAgICAgICAgdXJsOiBhamF4dXJsLFxuICAgICAgICAgIC8vIGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1lZGlhOiAkbWVkaWEudmFsKCksXG4gICAgICAgICAgICBlbnRpdHk6ICRlbnRpdHkudmFsKCksXG4gICAgICAgICAgICBzY3JlZW5zaG90OiAkc2NyZWVuc2hvdC52YWwoKSxcbiAgICAgICAgICAgIGxpbWl0OiAkbGltaXQudmFsKCksXG4gICAgICAgICAgICB0ZXJtOiAkdGVybS52YWwoKSxcbiAgICAgICAgICAgIGF0OiAkKCcjd3BhbC10b2tlbicpLnZhbCgpLFxuICAgICAgICAgICAgYWN0aW9uOiAnd3BhbF9hamF4X3NlYXJjaCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6ICdHRVQnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgJHJlc3VsdC5odG1sKGRhdGEpO1xuICAgICAgICAgICRsb2FkZXIuc2xpZGVVcCgxMDApO1xuICAgICAgICB9KVxuXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzKXtcbiAgICAgICAgICBpZih0ZXh0U3RhdHVzICE9PSAnYWJvcnQnKXtcbiAgICAgICAgICAgIGlmKF9sb2NhbGVfID09PSAnZW4nIHx8IF9sb2NhbGVfID09PSdlbl9VUycpe1xuICAgICAgICAgICAgICAkc3RhdHVzLnRleHQoJ0Nvbm5lY3Rpb24gZmFpbGVkLicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHN0YXR1cy50ZXh0KCfmjqXntprjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgIInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRsb2FkZXIuc2xpZGVVcCgxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygn55m65YuV77yBJyk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBzZXRfaGlkZGVuX3ZhbCgpe1xuXG4gICAgICB2YXIgc2VsZWN0VmFsID0gJHNlbGVjdC52YWwoKTtcblxuICAgICAgaWYoc2VsZWN0VmFsID09ICdpUGFkU29mdHdhcmUnIHx8IHNlbGVjdFZhbCA9PSAnbWFjU29mdHdhcmUnKXtcbiAgICAgICAgJG1lZGlhLnZhbCgnc29mdHdhcmUnKTtcbiAgICAgICAgJGVudGl0eS52YWwoc2VsZWN0VmFsKTtcbiAgICAgIH1lbHNlIGlmKHNlbGVjdFZhbCA9PSAnc29uZycgfHwgc2VsZWN0VmFsID09ICdhbGJ1bScpe1xuICAgICAgICAkbWVkaWEudmFsKCdtdXNpYycpO1xuICAgICAgICAkZW50aXR5LnZhbChzZWxlY3RWYWwpO1xuICAgICAgfVxuXG4gICAgICBlbHNle1xuICAgICAgICAkbWVkaWEudmFsKHNlbGVjdFZhbCk7XG4gICAgICAgICRlbnRpdHkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KShqUXVlcnkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9fc3JjL2pzL3dwLWFwcGxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);