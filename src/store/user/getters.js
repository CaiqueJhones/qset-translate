export function token (state) {
  return state.token
}

export function username (state) {
  return state.username
}

export function roles (state) {
  return state.roles
}

export function isAdministrator (state) {
  return !!(state.roles && state.roles.includes('ADMINISTRATOR'))
}

export function isJudge (state) {
  return !!(state.roles && state.roles.includes('JUDGE'))
}

export function isAuthenticated (state) {
  return !!state.token
}
