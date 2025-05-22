<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useT18nStore } from './stores/t18n.js'
import bjuih from './components/bjuih.vue'
import { fetchText } from './hostApi/fetchText.js'
import { fetchModText } from './hostApi/fetchModText.js'

const t18n = useT18nStore()
// console.log(t18n.initialised)
onMounted(async () => {
  let tx = await fetchText()
  if (t18n.adminMode) {
    let tx = await fetchModText()
  }
  // console.log(t18n.languageText, t18n.initialised)
})
// console.log('hihi')
// ;async () => {
//   // if (!t18n.initialised) {
//   let text = await readFile(t18n)
//   console.log('returned text', text)
//   t18n.languageText = text
//   // console.log('text', t18n.languageText)
//   t18n.initialised = true
//   // }
//   console.log('hohos')
// }
// async function readFile(ini) {
//   const fn = '/language/' + ini.language + '.json'
//   console.log(fn)
//   try {
//     const response = await fetch(fn)
//     if (!response.ok) {
//       throw new Error(`File not found or error reading file: ${fn} (${response.ok})`)
//     }
//     const text = await response.text() // ✅ Added await
//     console.log('response.text', text)
//     return text
//   } catch (error) {
//     console.error('Error:', error)
//     return null
//   }
// }
</script>

<template>
  <bjuih v-if="t18n.initialised == true"></bjuih>
</template>
