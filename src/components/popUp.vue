<template>
  <div
    class="popup"
    v-if="t18n.openMenu && !t18n.editor"
    :style="{ left: t18n.menuX + 'px', top: t18n.menuY + 'px' }"
  >
    <div>
      <span v-if="!t18n.editor" class="material-icons" :onclick="() => toEdit()"> edit_note </span>
      <span class="material-icons" :onclick="() => closePopUp()"> close </span>
    </div>
  </div>
</template>

<script setup>
import { useT18nStore } from '@/stores/t18n'

const t18n = useT18nStore()
t18n.originalText = null

const closePopUp = () => {
  t18n.editor = false
  t18n.openMenu = false
  t18n.originalText = null
}

const toEdit = () => {
  try {
    t18n.originalText = t18n.languageText[t18n.overPage][t18n.overId]['text']
  } catch {
    t18n.originalText = ''
  }
  t18n.editor = true
}
</script>

<style>
.popup {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.hover-element {
  display: inline-block;
  padding: 10px;
  background-color: lightblue;
  cursor: pointer;
}
</style>
