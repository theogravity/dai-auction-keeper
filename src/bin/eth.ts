#!/usr/bin/env node

import { onData } from '../stream'
import { Context } from '../context'
const { id } = require('minimist')(process.argv.slice(2))

require('../init')

const stdin = process.stdin
const stdout = process.stdout

const context = new Context(id, {
  stdout,
  stdin,
  currency: 'ETH',
  rate: 'DAI'
})

context.log(`Started: ${new Date().toUTCString()}\n`)

stdin.on('data', onData(context))
