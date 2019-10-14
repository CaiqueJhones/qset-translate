// import store from '../store'
// import { LocalStorage, SessionStorage } from 'quasar'

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters['user/isAuthenticated']) {
//     next()
//     return
//   } else if (SessionStorage.has('user-token')) {
//     store.commit('user/doLogin', SessionStorage.getItem('user-token'))
//     next()
//     return
//   } else if (LocalStorage.has('user-token')) {
//     store.commit('user/doLogin', LocalStorage.getItem('user-token'))
//     next()
//     return
//   }
//   next({ path: '/login', replace: true })
// }

const routes = [
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    // beforeEnter: ifAuthenticated,
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
