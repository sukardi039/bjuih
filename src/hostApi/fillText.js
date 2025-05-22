import { useT18nStore } from '../stores/t18n.js'
// import { fetchModText } from './fetchModText.js'

export async function fillText(page, tag) {
  // console.log('filling page:', page)
  const t18n = useT18nStore()
  let t = t18n.languageText[page]
  // console.log('render Page', page)
  let spans = document.getElementsByTagName(tag)
  for (var i = 0; i < spans.length; i++) {
    // let id = spans[i].id
    let idx = spans[i].id.split('/')
    let id = idx[0]
    let t = t18n.languageText[idx[1]]
    // console.log('id', idx[0], id, 'page', idx[1], page, 't', t)
    // if (idx[1] == idx[1]) {
    if (id.length) {
      try {
        spans[i].innerHTML = t[id]['text']
      } catch {
        spans[i].innerHTML = t18n.adminMode ? id : ''
      }
      // console.log(spans[i].id)
      // if (t18n.adminMode) {
      //   let tx = await fetchModText()
      // }
    }
    if (t18n.adminMode && idx[0]) {
      spans[i].addEventListener('mouseover', function (event) {
        if (!t18n.editor) {
          // do the pop up admin menu here
          console.log(event, page, id)
          t18n.menuX = event.pageX
          t18n.menuY = event.pageY
          t18n.overPage = idx[1]
          t18n.overId = id
          if (t18n.adminMode) {
            t18n.openMenu = true
          }
        }
        // console.log(t18n.menuX, t18n.menuY, t18n.openMenu)
      })
    }
    // }
  }
}
