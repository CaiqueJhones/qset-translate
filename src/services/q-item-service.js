import axios from 'axios'

export class QItemService {
  constructor () {
    this.url = 'q-item'
  }

  async list (size, page) {
    return axios.get(`${this.url}`, { params: { size, page } }).then(response => response.data)
  }

  async count () {
    return axios.get(`${this.url}/count`).then(response => response.data)
  }
}

export default new QItemService()
