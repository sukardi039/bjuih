<template>
  <div class="base-container">
    <div class="top-banner">
      <div class="top-filler"></div>
      <div class="set-homepage">
        <div>
          <span id="saveHome/main"></span>
        </div>
        <div>
          <span id="bookmark/main"></span>
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
    <div class="nav-bar"><mainMenu /></div>
  </div>
  <div class="page-container">
    <!-- <carousel /> -->
    <landing />
  </div>
  <div>{{ t18n.initialised }} {{ t18n.currentPage }}</div>
  <div><popUp /></div>
  <div><editText /></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useT18nStore } from '../stores/t18n.js'
import { fillText } from '@/hostApi/fillText'
import language from './language.vue'

import landing from './landing.vue'
// import carousel from './carousel.vue'
import mainMenu from './mainMenu.vue'
import popUp from './popUp.vue'
import editText from './editText.vue'

const t18n = useT18nStore()
// let ready = false
const pageCode = 'main'

onMounted(() => {
  // let tx = await fetchText()
  // console.log(t18n.languageText, t18n.initialised)
  fillText(pageCode, 'span')
  // ready = true
})
</script>
