// @flow


// For be sure that we are side effect free, views (react compoments) when respond 
// to an event must calls mapper(action, payload) and nothing else.
// TODO this rule should be enforced with static checking or runtime errors
//
import React from 'react';
import type {TransactionModelType, WalletModelType, ModelModelType} from './Models.js';
import type {Msg} from './Messages'
import {Wallet, Transaction, Model} from './Models.js'
import {mapper} from './Messages.js'
import {update} from './Update.js'


function RenderAddress(props : {wallet: Wallet}) {
  return <h1>{props.wallet.pubKey}</h1>;
}


function RenderTransaction(props : {transaction: Transaction}) {
  return <p>{props.transaction.amount}</p>;
}


function AddTx(props) {
  function addTx() {
    props.updater(mapper('Pay'))
    };
  return <button onClick={addTx}> Pay </button>;
}


// TODO View is not a type change name with view!!!
export function View(model : Model) {
  function updater(message: Msg) {
    update(model, message);
    }
  return (
  <div>
    <div>
      <RenderAddress wallet={model.wallet} />
    </div>
    <div>
      <RenderTransaction transaction={model.transactions.last()} />
    </div>
    <div>
      <AddTx updater={updater}/>
    </div>
  </div>
);}
