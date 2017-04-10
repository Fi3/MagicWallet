// @flow


import * as Immutable from 'immutable'
import {Model, ReciveForm} from './Models.js'
import type {Amount, TransactionModelType} from './Models.js'
import type {Msg} from './Messages.js'
import {View} from './View.js'
import {mapper} from './Messages.js'
import type {Render} from './Main.js'
import {moneyInTheWalletAfterTx} from './Utils.js'


export function update(model: Model, message: Msg, render : any): Render {
  //
  // `update` take a `Model` and a 'Message` and call `render` with the updated `Model`
  // or if `Message == 'None` it create the `View` with model.
  // TODO check if is better never return a `View` and always call `render` with the updated `Model`
  // and let the task to create a new `View` to another function
  //
  let updatedModel;
  let newView;
  if (message.type != 'None'){
    model = model.set('error', '')
  }
  switch (message.type) {
    case 'Pay':
      updatedModel = pay(model)
      newView = View(updatedModel, render)
      return render(updatedModel, mapper('None'))

    case 'UpdateAddressPayForm':
      updatedModel = model.setIn(['payForm','address'], message.payload);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));

    case 'UpdateAddressReciveForm':
      updatedModel = model.setIn(['reciveForm','address'], message.payload);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));

    case 'UpdateAmountPayForm':
      {const oldAmount = model.getIn(['payForm', 'amount'])
      const newAmount = updateAmount(oldAmount, message.payload)
      updatedModel = model.setIn(['payForm','amount'], newAmount);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));}

    case 'UpdateAmountReciveForm':
      {const oldAmount = model.getIn(['reciveForm', 'amount'])
      const newAmount = updateAmount(oldAmount, message.payload)
      updatedModel = model.setIn(['reciveForm','amount'], newAmount);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));}

    case 'Recive':
      updatedModel = recive(model)
      newView = View(updatedModel, render)
      return render(updatedModel, mapper('None'))

    case 'None':
      // $FlowFixMe
      return View(model, render)

    // Make flow check for exhaustiveness ty to gcanti
    // ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
    // TODO make helper function to reuse this pattern
    default:
      (message.type: empty);
      throw 'unknown action';
    };
}

function updateAmount(amount : Amount, valueInput : string): Amount {
  if (amount === 'Wrong' && /^[0-9]+$/.test(valueInput)) {
    return Number.parseInt(valueInput)
  }
  else if (amount === 'Wrong' && !/^[0-9]+$/.test(valueInput)) {
    return 'Wrong'
  }
  else if (amount !== 'Wrong' && /^[0-9]+$/.test(valueInput)) {
    const oldAmount = amount.toString()
    return Number.parseInt(valueInput)
  }
  else if (amount !== 'Wrong' && !/^[0-9]+$/.test(valueInput)) {
    return 'Wrong'
  }
  else {
    return 'Wrong'
  }
}


function recive(model : Model): Model {
  const hasValidAmount = typeof model.reciveForm.amount === 'number'
  const hasValidAddress = model.reciveForm.address != ''
  let updatedModel
  if (hasValidAmount && hasValidAddress) {
    const newTx =
      { sign : 'In'
      , amount : model.reciveForm.amount
      , counterparty : model.reciveForm.address
      }
    const newTxs = model.get('transactions').push(newTx)
    updatedModel = model.set('transactions', newTxs)
  }
  else {
    updatedModel = model.set('error', 'All the inputs should be filled')
  }
  // TODO flow do not check the below value find out why
  return updatedModel
}


function pay(model : Model): Model {
  const hasValidAmount = typeof model.payForm.amount === 'number'
  const hasValidAddress = model.payForm.address != ''
  const hasEnouphMoney = moneyInTheWalletAfterTx(model) >= 0
  let updatedModel
  if (hasValidAmount && hasValidAddress && hasEnouphMoney) {
    const newTx =
      { sign : 'Out'
      , amount : model.payForm.amount
      , counterparty : model.payForm.address
      }
    console.log(newTx)
    const newTxs = model.get('transactions').push(newTx)
    updatedModel = model.set('transactions', newTxs)
  }
  else if (!hasEnouphMoney) {
    updatedModel = model.set('error', 'You have not enough money in the wallet')
  }
  else {
    updatedModel = model.set('error', 'All the inputs should be filled')
  }
  // TODO flow do not check the below value find out why
  return updatedModel
}
