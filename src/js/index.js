const request = require('superagent')

const _locale_    = document.getElementsByTagName('html')[0].getAttribute('lang')
const $status     = document.getElementById('wpal-status')
const $select     = document.getElementById('wpal-select')
const $media      = document.getElementById('wpal-media')
const $entity     = document.getElementById('wpal-entity')
const $screenshot = document.getElementById('wpal-screenshot')
const $limit      = document.getElementById('wpal-limit')
const $term       = document.getElementById('wpal-term')
const $result     = document.getElementById('wpal-result')
const $loader     = document.getElementById('wpal-loader')
const $submit     = document.getElementById('wpal-submit')
const $token      = document.getElementById('wpal-token')

setValue()

$submit.addEventListener('click', () => {
  ajaxSend()
})

$select.addEventListener('change', () => {
  setValue()
})

$term.addEventListener('keydown', (e) => {
  // 検索ワード入力時にEnterで検索を実行。
  if((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
    e.preventDefault()
    ajaxSend()
  } else {
    return true
  }
})

function queryData () {
  return {
    media: $media.value,
    entity: $entity.value,
    screenshot: $screenshot.value,
    limit: $limit.value,
    term: $term.value,
    at: $token.value,
    action: 'wpal_ajax_search'
  }
}

function ajaxSend () {
  const term = $term.value

  if(term === '') {
    $loader.style.display = 'none'
    if(_locale_ === 'en' || _locale_ === 'en_US') {
      $result.textContent = 'Please Enter search keywords.'
    } else {
      $result.textContent = '検索キーワードを入力してください'
    }
    $term.focus()
  } else {
    $result.textContent = ''
    $loader.style.display = 'block'

    request
      .get(ajaxurl)
      .query(queryData())
      .end(function (err, res) {
        if(err || !res.ok) {
          if(_locale_ === 'en' || _locale_ === 'en_US') {
            $status.text('Connection failed.')
          } else {
            $status.text('接続に失敗しました。')
          }
          $loader.style.display = 'none'
          console.log(err)
        } else {
          if (res.status === 200) {
            $result.innerHTML = res.text
            $loader.style.display = 'none'
            console.log(res.statusText)
          }
        }
      })
  }
}

function setValue () {
  const selectVal = $select.value

  if(selectVal == 'iPadSoftware' || selectVal == 'macSoftware') {
    $media.value = 'software'
    $entity.value = selectVal
  } else if(selectVal == 'song' || selectVal == 'album') {
    $media.value = 'music'
    $entity.value = selectVal
  } else {
    $media.value = selectVal
    $entity.value = ''
  }
}
