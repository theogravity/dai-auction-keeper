import request from 'request-promise-native'
import { CoinbaseApi } from './interfaces'

const RATE_FEED_URL = 'https://api.coinbase.com/v2/exchange-rates'
const GAS_FEED_URL = 'https://www.etherchain.org/api/gasPriceOracle'
const GWEI_TO_WEI_FACTOR = 1000000000

// Gets the latest currency price
export async function getCurrencyRate (currency: string, rate: string) {
  const rates: CoinbaseApi.IExchangeRateRes = await request({
    url: RATE_FEED_URL,
    qs: {
      currency: currency.toUpperCase()
    },
    json: true
  })

  return rates.data.rates[rate.toUpperCase()]
}

export async function getGasPrice (): Promise<number> {
  const prices = await request({
    url: GAS_FEED_URL,
    json: true
  })

  // uses a 'fast' gas price
  return (prices['fast'] * GWEI_TO_WEI_FACTOR) as number
}
