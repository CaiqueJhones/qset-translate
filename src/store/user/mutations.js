import axios from 'axios'

export function doLogin (state, user) {
  state.username = user.username
  state.token = user.token
  state.roles = user.roles
  if (user.token) {
    axios.defaults.headers['Authorization'] = `Bearer ${user.token}`
  } else {
    delete axios.defaults.headers['Authorization']
  }
}

export function setInfo (state, user) {
  state.username = user.username
  state.roles = user.roles
}
