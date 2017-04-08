// @flow


import {Model} from './Models.js'
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
      return pay();//Ritrna update(pay) devo passare una funzione all evento

		// Make flow check for exhaustiveness ty to gcanti
		// ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
		// TODO make helper function to reuse this pattern
    default:
			(action: empty);
      throw 'unknown action';
    };
  };

