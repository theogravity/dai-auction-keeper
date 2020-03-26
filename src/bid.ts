import { IBidMessage } from './interfaces'
import { getCurrencyRate } from './feed'
import { Context } from './context'

// your ethereum address
// used to detect if the last bid was made by yourself
const SELF = process.env.ETH_ADDR

export async function calculatePrice (context: Context, data: IBidMessage) {
  let isDent = false

  // https://docs.makerdao.com/keepers/auction-keepers/auction-keeper-bot-setup-guide#glossary-bidding-models
  const bid = parseFloat(data.bid)
  const beg = parseFloat(data.beg)
  const tab = parseFloat(data.tab)
  let lot = parseFloat(data.lot)
  const price = parseFloat(data.price)
  const bidder = data.guy

  if (bidder === SELF) {
    context.log(`Bidder is self, skipping processing.\n`)
    return 0
  }

  if (data.bid === data.tab) {
    isDent = true
  }

  let marketRate

  try {
    // get the price of the currency
    // if currency = ETH
    // rate = DAI
    // then the market rate is 1 ETH = x DAI
    marketRate = await getCurrencyRate(context.currency, context.rate)
  } catch (e) {
    context.log('Could not get price rate: ' + e.message)
    process.exit(-1)
  }

  context.log(
    `${context.currency} Market Price: ${marketRate} / ${context.rate}\n`
  )

  if (isDent) {
    context.log(`Dent bid\n`)

    // return your price for a dent bid
    return 0
  } else {
    context.log(`Tend bid\n`)

    // return your price for a tend bid
    return 0
  }

  // return 0 to make no bid
  return 0
}
