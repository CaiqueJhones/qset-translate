import axios from 'axios'

class UserService {
  constructor () {
    this.url = 'usuario'
  }

  async login (username, password) {
    return axios.post('/login', { usuario: username, senha: password }).then(response => response.data)
  }
}
export default new UserService()
