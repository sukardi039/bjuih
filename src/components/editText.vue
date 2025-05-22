<template>
  <div v-if="t18n.editor">
    <div class="editForm">
      <div class="edit-label">Page: {{ t18n.overPage }}</div>
      <div class="edit-label">Label: {{ t18n.overId }}</div>
      <div><span>Original Text</span></div>
      <div><span>Edit Text</span></div>
      <div>
        <span>{{ t18n.originalText }}</span>
      </div>
      <div>
        <textarea name="editedText" id="editedText">{{ t18n.originalText }}</textarea>
      </div>
      <div></div>
      <div>
        <button :onclick="() => updateText(t18n)">Update</button>
        <button :onclick="() => closeEditText()">cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useT18nStore } from '@/stores/t18n'
import { fetchModText } from '@/hostApi/fetchModText'
import { fillText } from '@/hostApi/fillText'

const t18n = useT18nStore()
let changedText = t18n.originalText
console.log(changedText)

const closeEditText = () => {
  t18n.editor = false
  t18n.originalText = null
}

const updateText = async (t18n) => {
  console.log('chgtxt', changedText)
  console.log(t18n)
  console.log('get value', document.getElementById('editedText').value)
  let textId = 0
  try {
    // let textId = t18n.languageText[t18n.overPage][t18n.overId]['id']
    t18n.languageText[t18n.overPage][t18n.overId]['id']
  } catch {
    null
  }
  console.log('textid', textId)
  try {
    const response = await fetch('http://localhost:8080/api/modtexts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        '{"language":"' +
        t18n.language +
        '", "page":"' +
        t18n.overPage +
        '", "mark":"' +
        t18n.overId +
        '", "text":"' +
        document.getElementById('editedText').value +
        '"}',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    // let data = await response.json()
    await response.json()
    await fetchModText()
    fillText(t18n.overPafe, 'span')
    t18n.editor = false
    // console.log('data', data.value)
    // t18n.languageText = makeText(data.value)
    // t18n.languageText = makeTextArray(data.value)
  } catch (e) {
    console.log('error', e)
  }
}
</script>
