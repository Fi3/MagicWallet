// @flow


import {Wallet, Transaction, Model} from './Models.js'
import type {TransactionModelType} from './Models.js'



export type Actions
  = 'Pay'


export type Payloads
  = TransactionModelType


export type Msg
  = {type: Actions, payload : TransactionModelType}


function pay(): Msg {
  const tx =
    { sign : 'In'
    , amount : 23
    , counterparty : 'gas'
    };
    return {type: 'Pay', payload: tx};
}


export function mapper(action: Actions, payload: ?Payloads): Msg {
  switch (action) {
		case 'Pay':
      return pay();

    default:
      throw new Error();
    };
  };
