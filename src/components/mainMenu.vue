<template>
  <div class="menu-bar">
    <a href="" class="menu-link"><span id="landing/menu"></span></a>

    <a href="" class="menu-link"><span id="intro/menu"></span></a>
    <a href="" class="menu-link"><span id="clinic/menu"></span></a>
    <a href="" class="menu-link"><span id="news/menu"></span></a>
    <a href="" class="menu-link"><span id="notice/menu"></span></a>
    <a href="" class="menu-link"><span id="health/menu"></span></a>
    <a href="" class="menu-link"><span id="bju/menu"></span></a>
    <a href="" class="menu-link"><span id="student/menu"></span></a>
    <a href="" class="menu-link"><span id="party/menu"></span></a>
  </div>
</template>

<script setup>
// import { useT18nStore } from '@/stores/t18n'
import { fillText } from '@/hostApi/fillText'

// const t18n = useT18nStore()
const pageCode = 'menu'

const t = fillText(pageCode, 'span')
</script>
