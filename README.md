# dai-auction-keeper

Example model for the dai auction-keeper bot.

I offer no assistance with this code, and take no responsibility for loss in funds, etc.

# Requirements

- node.js 12
- understanding of node.js / javascript / typescript

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
- Logs are written to `/tmp/auction-${currency}-${auction-id}.txt`

# Building

`$ npm run build`

# Executing

- Make sure the `build/bin/*` files have read/execute permission
- Execute the model using `bin/bat.ts` for BAT and `bin/eth.ts` for ETH auctions.

`$ <path-to-auction-keeper>/flip-eth-a.sh <path-to-dai-auction-keeper>/build/bin/eth.js`
