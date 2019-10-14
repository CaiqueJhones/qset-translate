export function token (state) {
  return state.token
}

export function isAuthenticated (state) {
  return !!state.token
}
