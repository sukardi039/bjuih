import { ref } from 'vue'
import { makeText } from './makeText.js'
import { fetchModText } from './fetchModText.js'
import { useT18nStore } from '../stores/t18n.js'

export async function fetchText() {
  const t18n = useT18nStore()
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  // console.log('init', t18n.initialised)
  if (t18n.initialised === false) {
    try {
      const response = await fetch('http://localhost:8080/api/texts/by-lang/' + t18n.language, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
      // console.log('data', data.value)
      t18n.languageText = makeText(data.value)
      if (t18n.adminMode) {
        await fetchModText()
      }
      // t18n.languageText = makeTextArray(data.value)
      t18n.initialised = true
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
}
