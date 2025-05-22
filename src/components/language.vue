<template>
  <div>
    <span>{{ t18n.language }}</span>
    <span
      v-if="t18n.adminMode"
      :class="'material-icons set-language-icon'"
      :onClick="() => switchAdmin()"
    >
      logout
    </span>
    <span v-else :class="'material-icons set-language-icon'" :onClick="() => switchAdmin()">
      settings
    </span>
    <span
      v-if="t18n.adminMode"
      :class="'material-icons set-language-icon'"
      :onClick="() => publish()"
      >publish</span
    >
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useT18nStore } from '../stores/t18n'
import { fetchText } from '@/hostApi/fetchText'
import { fillText } from '@/hostApi/fillText'
const t18n = useT18nStore()

const switchAdmin = async () => {
  // if (!t18n.adminMode) {
  t18n.languageText = null
  t18n.initialised = false
  // }
  t18n.adminMode = !t18n.adminMode
  await fetchText()
  await fillText(t18n.overPage, 'span')
  t18n.openMenu = t18n.adminMode
}

const publish = async () => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

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
    await publishLanguage(data)
    console.log('pack')
    await packLanguage()
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

const publishLanguage = async (data) => {
  console.log('data', data.value)
  console.log('length', data.value.length)
  for (var i = 0; i < data.value.length; i++) {
    let t = data.value[i]
    try {
      const response = await fetch('http://localhost:8080/api/texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          '{"language":"' +
          t18n.language +
          '", "page":"' +
          t.page +
          '", "mark":"' +
          t.mark +
          '", "text":"' +
          t.text +
          '"}',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      await response.json()
      await removeChanges(t.id)
    } catch (e) {
      console.log('error', e)
    }
  }
  fillText(t18n.overPafe, 'span')
  t18n.editor = false
}

const removeChanges = async (id) => {
  try {
    const response = await fetch('http://localhost:8080/api/modtexts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Ensures CORS is enabled
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    await response.json()
  } catch (e) {
    console.log('error', e)
  }
}

const packLanguage = async () => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
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
    if (data.value.length) {
      let tOld = data.value[0]
      for (var i = 1; i < data.value.length; i++) {
        let t = data.value[i]
        if (t.language == tOld.language && t.page == tOld.page && t.mark == tOld.mark) {
          await removeOldText(tOld.id)
        }
        tOld = t
      }
    }
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

const removeOldText = async (id) => {
  try {
    const response = await fetch('http://localhost:8080/api/texts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Ensures CORS is enabled
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    await response.json()
  } catch (e) {
    console.log('error', e)
  }
}
</script>
