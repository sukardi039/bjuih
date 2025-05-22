<template>
  <div class="base-container">
    <div class="top-banner">
      <div class="top-filler"></div>
      <div class="set-homepage">
        <div>
          <span>{{ t18n.languageText.main.saveHome }}</span>
        </div>
        <div>
          <span>加入收藏</span>
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
  <div>
    {{ t18n.languageText }}
  </div>
</template>

<script setup>
// import { icons } from 'vue3-carousel'
import { useT18nStore } from '../stores/t18n.js'
import carousel from './carousel.vue'
import language from './language.vue'
const t18n = useT18nStore()
// console.log('hihi')
if (!t18n.initialised) {
  // console.log(t18n)
  let text = await readText(t18n)
  t18n.languageText = JSON.parse(text)
}
</script>

<script>
const readText = async (ini) => {
  const fileName = '/language/' + ini.language + '.json'
  let tx = await readFile(fileName)
  console.log('tx', tx)
  ini.initialised = true
  return tx
}
async function readFile(fn) {
  try {
    const response = await fetch(fn)
    if (!response.ok)
      throw new Error('File not found or error reading file.' + fn + '(' + response.ok + ')')
    const text = response.text()
    console.log('response.text', text)
    return text
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style></style>
