import axios from 'axios'
import fileDownload from 'js-file-download'
import { notifyBlobError } from 'services/notify'

class ReportService {
  async surveyReport (username) {
    return axios.get('/report', {
      params: { username },
      responseType: 'blob'
    }).then(response => {
      fileDownload(response.data, `REPORT-${username}.xls`)
    }).catch(error => {
      notifyBlobError(error)
    })
  }
}

export default new ReportService()
