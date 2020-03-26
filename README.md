# dai-auction-keeper

Example model for the DAI cryptocurrency [auction-keeper](https://github.com/makerdao/auction-keeper) bot.

I offer no assistance with this code, and take no responsibility for loss in funds, etc.

# Requirements

- node.js 12
- understanding of node.js / javascript / typescript
- have a working `auction-keeper` bot ready to accept a model

# Architecture

- All code is in `/src/`
- Entrypoint for the model is in `bin/<currency>.ts`

Executing the model does the following

- runs `init.ts`
- starts reading `stdin` and sends data to `stream.ts`
- `stream.ts` will take in any incoming bids from the `auction-keeper` and feeds the data into `bid.ts`
- `bid.ts` fetches the current market rate for the currency being auctioned; logic to determing bidding price is executed here, and a bid price is returned to `stream.ts`
- if the bid price > 0, `stream.ts` fetches gas prices, and uses the `fast` value to determine the gas price to pay for setting the bid
- the bid is sent out via `stdout` to `auction-keeper`
- the cycle re-starts every 10 mins of no new bids (so the model can be re-executed against a new market rate), or when a new bid arrives
- `auction-keeper` will terminate the model process when the auction is over

# Usage

- Create a `.env` file in this project with the following data

```env
# This is used to skip incoming bids that were made by your address
# so you do not end up outbidding yourself
ETH_ADDR=<Your ethereum address>
```

- `bid.ts` is where you would write your model pricing logic. Return a non-zero value to make a bid.
Be aware that for `dent` auctions, there are [specific rules](https://github.com/makerdao/auction-keeper/blob/master/auction_keeper/strategy.py#L87) 
that determine the price you should send. By default, it will not send a bid (by returning a 0 price). 
You must define logic to determine what bid to send.

# Building

`$ npm run build`

The built files are located in `build/`.

# Executing

- Make sure the `build/bin/*` files have read/execute permission
- Logs are written to `/tmp/auction-${currency}-${auction-id}.txt`
- Execute the model using `bin/bat.ts` for BAT and `bin/eth.ts` for ETH auctions.

`$ <path-to-auction-keeper>/flip-eth-a.sh <path-to-dai-auction-keeper>/build/bin/eth.js`
