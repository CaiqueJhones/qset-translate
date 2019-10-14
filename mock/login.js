module.exports = (req, res, next) => {
  if (req.url === '/login') {
    req.body = { token: 'jKytgbAwer' }
  }
  next()
}
