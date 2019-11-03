import axios from 'axios'
import store from '../store'

export default async ({ Vue }) => {
  const url = process.env.DEV ? '/api' : 'https://sami-qsort.herokuapp.com/'
  axios.defaults.baseURL = url
  axios.defaults.timeout = 5000

  const token = store.getters['user/token']
  if (token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  Vue.prototype.$axios = axios
}
