import { ref } from 'vue'
import api from '../axiosInstance' // Import the Axios instance

const posts = ref([])
const loading = ref(true)

const axiosFetch = async (url) => {
  try {
    const response = await api.get(url) // Example API call
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching:', error)
  } finally {
    loading.value = false
  }
}

export { axiosFrtch }
