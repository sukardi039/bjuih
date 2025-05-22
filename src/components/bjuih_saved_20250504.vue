<template>
  <div class="base-container">
    <div class="top-banner">
      <div class="top-filler"></div>
      <div class="set-homepage">
        <div>
          <span>ss</span>
        </div>
        <div>
          <span>bb</span>
        </div>
      </div>
      <div class="set-language">
        <language />
      </div>
    </div>
    <div class="banner">
      <div class="main-logo">
        <img src="../assets/logoh.png" alt="" />
      </div>
      <img class="banner-cloud" src="../assets/cloud-pattern.png" alt="" />
    </div>
    <div class="nav-bar">menu bar</div>

    <carousel />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useT18nStore } from '../stores/t18n.js'
import carousel from './carousel.vue'
import language from './language.vue'
const t18n = useT18nStore()
console.log('hihi')
onMounted(async () => {
  // if (!t18n.initialised) {
  let text = await readFile(t18n)
  console.log('returned text', text)
  t18n.languageText = text
  // console.log('text', t18n.languageText)
  // t18n.initialised = true
  // }
})
console.log('hohos')
</script>

<script>
const switchAdmin = () => (t18n.adminMode = !t18n.adminMode)
const readText = async (ini) => {
  const fileName = '/language/' + ini.language + '.json'
  let tx = await readFile(fileName)
  console.log('tx', tx)
  ini.initialised = true
  return tx
}
async function readFile(ini) {
  const fn = '/language/' + ini.language + '.json'
  console.log(fn)
  try {
    const response = await fetch(fn)
    if (!response.ok) {
      throw new Error(`File not found or error reading file: ${fn} (${response.ok})`)
    }
    const text = await response.text() // ✅ Added await
    console.log('response.text', text)
    return text
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
</script>

<style></style>
