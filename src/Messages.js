// @flow


import {Model} from './Models.js'
import type {TransactionModelType, Address} from './Models.js'



export type Actions
  = 'Pay'
  | 'None'
  | 'UpdateAddressPayForm'
  | 'UpdateAddressReciveForm'


export type Payloads
  = Address
  | TransactionModelType


export type Msg
  = {type: 'Pay', payload : TransactionModelType}
  | {type: 'None', payload : {}}
  | {type: 'UpdateAddressPayForm', payload: Address}
  | {type: 'UpdateAddressReciveForm', payload: Address}


function pay(): Msg {
  const tx =
    { sign : 'In'
    , amount : 23
    , counterparty : 'gas'
    };
   return {type: 'Pay', payload: tx};
}


// TODO check payload with flow!
export function mapper(action: Actions, payload : ?Payloads): Msg {
  switch (action) {
    case 'Pay':
      return pay();

    case 'None':
      return {type: action, payload: {}}

    case 'UpdateAddressPayForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAddressPayForm', payload: payload}
      }
      else {
        return {type: 'UpdateAddressPayForm', payload: ''}
      }

    case 'UpdateAddressReciveForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAddressReciveForm', payload: payload}
      }
      else {
        return {type: 'UpdateAddressReciveForm', payload: ''}
      }

    // Make flow check for exhaustiveness ty to gcanti
    // ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
    // TODO make helper function to reuse this pattern
    default:
     (action: empty);
     throw 'unknown action';
    };
  };

