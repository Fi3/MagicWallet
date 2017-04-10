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
