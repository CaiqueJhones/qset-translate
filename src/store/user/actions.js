import { LocalStorage, SessionStorage, Notify } from 'quasar'
import userService from 'services/user-service'

export async function doLogin ({ commit }, userInfo) {
  try {
    const data = await userService.login(userInfo.username, userInfo.password)
    if (userInfo.remember) {
      LocalStorage.set('user-token', data.token)
    } else {
      SessionStorage.set('user-token', data.token)
    }
    commit('doLogin', data)
  } catch (error) {
    throw error.response.data
  }
}

export function doLogout ({ commit }) {
  try {
    LocalStorage.remove('user-token')
    SessionStorage.remove('user-token')
    commit('doLogin', { username: '', roles: [], token: '' })
  } catch (error) {
    throw error.response.data
  }
}

export async function userInfo ({ commit }) {
  try {
    const info = await userService.info()
    commit('setInfo', info)
  } catch (error) {
    let message = error.response.data ? error.response.data.message : null
    message = message || 'Não foi possível obter o perfil do usuário'
    Notify.create({
      message,
      position: 'bottom-right',
      color: 'red',
      icon: 'error_outline'
    })
    throw error
  }
}
