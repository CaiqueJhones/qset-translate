import { Notify } from 'quasar'

export function notifyError (error, defaultMessage = 'Não foi possível obter acesso ao servidor!') {
  let message = error.response.data ? error.response.data.message : null
  message = message || defaultMessage
  Notify.create({
    message,
    position: 'bottom-right',
    color: 'red',
    icon: 'error_outline'
  })
}

export function notifyErrorMessage (message) {
  Notify.create({
    message,
    position: 'bottom-right',
    color: 'red',
    icon: 'error_outline'
  })
}

export function notifySuccess (message) {
  Notify.create({
    message,
    position: 'bottom-right',
    color: 'green',
    icon: 'check_circle_outline'
  })
}

export function notifyWarn (message) {
  Notify.create({
    message,
    position: 'bottom-right',
    color: 'warning',
    icon: 'warning'
  })
}

export function notifyBlobError (error, defaultMessage = 'Não foi possível obter acesso ao servidor!') {
  if (error.response.data) {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => {
      const json = JSON.parse(reader.result)
      Notify.create({
        message: json.message,
        position: 'bottom-right',
        color: 'red',
        icon: 'error_outline'
      })
    })
    reader.readAsText(error.response.data)
  } else {
    notifyErrorMessage(defaultMessage)
  }
}
