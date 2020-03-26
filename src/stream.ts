import { IBidMessage } from './interfaces'
import { calculatePrice } from './bid'
import { Context } from './context'
import { getGasPrice } from './feed'

let input = ''
let priceLoop

export function onData (context: Context) {
  return async (chunk: string) => {
    input += chunk

    if (chunk.includes('\n')) {
      if (priceLoop) {
        clearInterval(priceLoop)
        priceLoop = null
      }

      const message = JSON.parse(input) as IBidMessage

      // eslint-disable-next-line handle-callback-err
      context.log(input)

      input = ''

      await createPriceLoop(context, message)

      // re-trigger the flow every 10 mins
      priceLoop = setInterval(async () => {
        await createPriceLoop(context, message)
      }, 600000)
    }
  }
}

async function createPriceLoop (context, message) {
  context.log('----- Start Calculations -----\n')
  const price = await calculatePrice(context, message)

  let gasPrice

  try {
    gasPrice = await getGasPrice()
  } catch (e) {
    context.log(`Error fetching gas price: ` + e.message)
    process.exit(-1)
  }

  if (price > 0) {
    const out =
      JSON.stringify({
        price: `${price}`,
        gasPrice
      }) + '\n'

    context.log(out)

    context.stdout.write(out)
  }

  clearInterval(priceLoop)
  priceLoop = null
}
