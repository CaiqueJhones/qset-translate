import { LocalStorage, SessionStorage } from 'quasar'
import userService from 'services/user-service'

export async function doLogin ({ commit }, userInfo) {
  try {
    const data = await userService.login(userInfo.username, userInfo.password)
    if (userInfo.remember) {
      LocalStorage.set('user-token', data.token)
    } else {
      SessionStorage.set('user-token', data.token)
    }
    commit('doLogin', data.token)
  } catch (error) {
    throw error.response.data
  }
}

export function doLogout ({ commit }) {
  try {
    LocalStorage.remove('user-token')
    SessionStorage.remove('user-token')
    commit('doLogin', null)
  } catch (error) {
    throw error.response.data
  }
}
