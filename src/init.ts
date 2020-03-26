require('dotenv').config()

process.stdin.setEncoding('utf8')

process.on('SIGTERM', () => {
  process.exit(0)
})

process.on('SIGINT', () => {
  process.exit(0)
})
