import fs from 'fs'

export function getLogger (id, currency) {
  return data => {
    fs.appendFileSync(`/tmp/auction-${currency}-${id}.txt`, data)
  }
}
