export interface IBidMessage {
  id: string
  flipper: string
  bid: string
  lot: string
  tab: string
  beg: string
  guy: string
  era: number
  tic: number
  end: number
  price: string
}

export namespace CoinbaseApi {
  export interface IExchangeRateRes {
    data: {
      currency: string
      rates: {
        [key: string]: number
      }
    }
  }
}
