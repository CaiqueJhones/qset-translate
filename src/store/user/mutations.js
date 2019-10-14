import axios from 'axios'

export function doLogin (state, token) {
  state.token = token
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers['Authorization']
  }
}
