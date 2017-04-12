// @flow


import {Model} from './Models.js'
import type {TransactionModelType, Address} from './Models.js'



export type Actions
  = 'Pay'
  | 'None'
  | 'UpdateAddressPayForm'
  | 'UpdateAddressReciveForm'
  | 'UpdateAmountPayForm'
  | 'UpdateAmountReciveForm'
  | 'Recive'
  | 'ChangeMode'
  | 'UpdateEasterMessage'


export type Payloads
  = Address
  | TransactionModelType
  | string


export type Msg
  = {type: 'Pay', payload : null}
  | {type: 'None', payload : {}}
  | {type: 'UpdateAddressPayForm', payload: Address}
  | {type: 'UpdateAddressReciveForm', payload: Address}
  | {type: 'UpdateAmountPayForm', payload: string}
  | {type: 'UpdateAmountReciveForm', payload: string}
  | {type: 'Recive', payload: null}
  | {type: 'ChangeMode', payload: null}
  | {type: 'UpdateEasterMessage', payload: string}


// TODO check payload with flow!
export function mapper(action: Actions, payload : ?Payloads): Msg {
  switch (action) {
    case 'Pay':
      return {type: 'Pay', payload: null};

    case 'None':
      return {type: action, payload: {}}

    case 'UpdateAddressPayForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAddressPayForm', payload: payload}
      }
      else {
        console.log('unknown event');
        return {type: 'UpdateAddressPayForm', payload: ''}
      }

    case 'UpdateAddressReciveForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAddressReciveForm', payload: payload}
      }
      else {
        console.log('unknown event');
        return {type: 'UpdateAddressReciveForm', payload: ''}
      }

    case 'UpdateAmountPayForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAmountPayForm', payload: payload}
      }
      else {
        console.log('unknown event');
        return {type: 'UpdateAmountPayForm', payload: ''}
      }

    case 'UpdateAmountReciveForm':
      if (typeof payload === 'string') {
        return {type: 'UpdateAmountReciveForm', payload: payload}
      }
      else {
        console.log('unknown event');
        return {type: 'UpdateAmountReciveForm', payload: ''}
      }

    case 'Recive':
      return {type: 'Recive', payload: null}

    case 'ChangeMode':
      return {type: 'ChangeMode', payload: null}

    case 'UpdateEasterMessage':
      if (typeof payload === 'string') {
        return {type: 'UpdateEasterMessage', payload: payload}
      }
      else {
        console.log('unknown event');
        return {type: 'UpdateEasterMessage', payload: ''}
      }

    // Make flow check for exhaustiveness ty to gcanti
    // ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
    // TODO make helper function to reuse this pattern
    default:
     (action: empty);
     throw 'unknown action';
    };
  };

