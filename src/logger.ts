import fs from 'fs'

// logs messages to a file
// be sure to add a newline to your messages to space them out
export function getLogger (id, currency) {
  return data => {
    fs.appendFileSync(`/tmp/auction-${currency}-${id}.txt`, data)
  }
}
