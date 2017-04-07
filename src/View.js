// @flow


import React from 'react';
import type {TransactionModelType, WalletModelType, ModelModelType} from './Models.js';
import {Wallet, Transaction, Model} from './Models.js'


function RenderAddress(props : {wallet: Wallet}) {
  return <h1>{props.wallet.pubKey}</h1>;
  }


function RenderTransaction(props : {transaction: Transaction}) {
  return <p>{props.transaction.amount}</p>;
	}


export function View(model : Model) {
	return (
		<div>
      <div>
        <RenderAddress wallet={model.wallet} />
      </div>
        <RenderTransaction transaction={model.transactions.last()} />
		  <div>
		  </div>
		</div>
	);}
