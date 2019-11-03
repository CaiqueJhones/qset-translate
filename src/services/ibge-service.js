import axios from 'axios'

export class IbgeService {
  constructor () {
    this.instance = axios.create({
      baseURL: 'https://br-cidade-estado-nodejs.glitch.me'
    })
  }

  async getEstados () {
    return this.instance.get('estados').then(response => response.data)
  }
}

export default new IbgeService()
