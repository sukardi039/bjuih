import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
      console.log('fetched', data)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  fetchData()

  let setId = setInterval(() => {
    if (loading.value === false) {
      clearInterval(setId)
      console.log('confirmed fetched', data)
      return { data, error, loading, refresh: fetchData }
    }
  }, 1000)
}
