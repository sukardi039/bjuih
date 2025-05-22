<template>
  <carousel></carousel>
</template>

<script setup>
import { useT18nStore } from '../stores/t18n'

import carousel from './carousel.vue'
const t18n = useT18nStore()
const pageCode = 'landing'
</script>
