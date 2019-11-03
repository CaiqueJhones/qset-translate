import axios from 'axios'

export class JudgeService {
  constructor () {
    this.url = 'judge'
  }

  async details () {
    return axios.get(`${this.url}/details`).then(response => response.data)
  }

  async acceptTerm () {
    return axios.post(`${this.url}/term`, { accept: true }).then(response => response.data)
  }

  async saveDescription (description) {
    return axios.post(`${this.url}/description`, description).then(response => response.data)
  }

  async getEquivalences () {
    return axios.get(`${this.url}/equivalence`).then(response => response.data)
  }

  async saveEquivalences (equivalences) {
    return axios.post(`${this.url}/equivalence`, equivalences).then(response => response.data)
  }

  /**
   * Checks if all equivalences have been analyzed.
   */
  async equivalenceComplete () {
    return axios.get(`${this.url}/equivalence/complete`).then(response => response.data)
  }

  async saveOpinion (opinion) {
    return axios.post(`${this.url}/opinion`, opinion).then(response => response.data)
  }

  async finishSurvey () {
    return axios.post(`${this.url}/finish-survey`).then(response => response.data)
  }
}

export default new JudgeService()
