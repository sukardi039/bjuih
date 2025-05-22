import { ref } from 'vue'
// import { makeTextArray } from './makeTextArray.js'
import { useT18nStore } from '../stores/t18n.js'

export async function fetchModText() {
  const t18n = useT18nStore()
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  // console.log('init', t18n.initialised)
  //  if (t18n.initialised === false) {
  try {
    const response = await fetch('http://localhost:8080/api/modtexts/by-lang/' + t18n.language, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data.value = await response.json()
    console.log('data', data.value)
    console.log('length', data.value.length)
    for (var i = 0; i < data.value.length; i++) {
      let t = data.value[i]
      let exist = true
      console.log(i, t.page, t.mark)
      if (!t18n.languageText[t.page]) {
        t18n.languageText[t.page] = {}
      }
      if (!t18n.languageText[t.page][t.mark]) {
        t18n.languageText[t.page][t.mark] = {}
        exist = false
      }
      t18n.languageText[t.page][t.mark]['text'] = t.text
      if (!exist) {
        t18n.languageText[t.page][t.mark]['id'] = 0
      }
      console.log('languageText', t18n.languageText)
    }
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
  //  }
}
