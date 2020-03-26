import { getLogger } from './logger'
import WritableStream = NodeJS.WritableStream
import ReadableStream = NodeJS.ReadableStream

export interface ContextParams {
  stdout: WritableStream
  stdin: ReadableStream
  /**
   * The target currency to bid against
   */
  currency: string
  /**
   * The market rate of that currency
   * Ex: currency = ETH, rate = DAI will result in a quote of 1 ETH / DAI
   * when fetching market data
   */
  rate: string
}

export class Context {
  log: any
  id: string
  stdout: WritableStream
  stdin: ReadableStream
  currency: string
  rate: string

  constructor (id: string, params: ContextParams) {
    this.id = id
    this.log = getLogger(id, params.currency)
    this.stdout = params.stdout
    this.stdin = params.stdin
    this.currency = params.currency
    this.rate = params.rate
  }
}
