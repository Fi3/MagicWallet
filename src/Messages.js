// @flow


import {Model} from './Models.js'
import type {TransactionModelType} from './Models.js'



export type Actions
  = 'Pay'
  | 'None'


export type Payloads
  = TransactionModelType


export type Msg
  = {type: 'Pay', payload : TransactionModelType}
  | {type: 'None', payload : {}}


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

    case 'None':
      return {type: action, payload: {}}

		// Make flow check for exhaustiveness ty to gcanti
		// ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
		// TODO make helper function to reuse this pattern
    default:
			(action: empty);
      throw 'unknown action';
    };
  };

