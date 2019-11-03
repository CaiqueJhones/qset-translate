import axios from 'axios'

class UserService {
  constructor () {
    this.url = 'user'
  }

  async login (username, password) {
    return axios.post('/login', { username, password }).then(response => response.data)
  }

  async info () {
    return axios.get(`${this.url}/info`).then(response => response.data)
  }
}
export default new UserService()
