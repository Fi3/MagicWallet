// @flow


import type {InOut} from './Models.js'
import {Wallet, Transaction, Model} from './Models.js'


// Initialize the Model (redux Store)


const initialWallet =
  { privKey : ''
  , pubKey : ''
  }


const inititialTransaction =
  { sign : 'In'
  , amount : 22
  , counterparty : 'foo'
  }


export const initialModel : Model =
  Model.fromJS(
  { wallet : initialWallet
  , transactions : [inititialTransaction]
  });


// Inintialize View and listen for message


