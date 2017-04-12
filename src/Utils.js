// @flow



import {Model} from './Models.js'


// $FlowFixMe
export  function sumAmount(acc, val) {
    if (val.sign === 'In'){
      return acc + val.amount
    }
    else{
      return acc - val.amount
    }
  }


export  function moneyInTheWalletAfterTx(model : Model): number {
  const amount = model.transactions.reduce(sumAmount, 0)
  let outgoingMoney
  if (typeof model.payForm.amount === 'number') {
    outgoingMoney = model.payForm.amount
  }
  else {
    outgoingMoney = 0;
  }
  return amount - outgoingMoney;
 }


export function serializer(model : Model) {
  //
  // THIS SERIALIZER IS A PROVISIONAL SOLUTION CHANGE IT
  // this serializer is poor in performance very verbose and har to maintain
  // has been adopted as a provisional solution because JSON.stringify 
  // doesn't serialize the object created from flow-immutable-models.
  // It also seems that toJs doesn't work correctly
  // TODO figure out how to serialize flow-immutable-models or find anoter
  // way to use immutable objects with flow
  //
  const transactions = model.get('transactions').map(x => x).toJS()
  const payFormAddress = model.getIn(['payForm', 'address'])
  const payFormAmount = model.getIn(['payForm', 'amount'])
  const reciveFormAddress = model.getIn(['reciveForm', 'address'])
  const reciveFormAmount = model.getIn(['reciveForm', 'amount'])
  const error = model.get('error')
  const funnyMode = model.get('funnyMode')
  const easterEggMessage = model.get('easterEggMessage')
  const modelJS =
    { transactions : transactions
    , payForm :
      { address : payFormAddress
      , amount : payFormAmount
      }
    , reciveForm :
      { address : reciveFormAddress
      , amount : reciveFormAmount
      }
    , error : error
    , funnyMode : funnyMode
    , easterEggMessage : easterEggMessage
    }
  return JSON.stringify(modelJS)
}
