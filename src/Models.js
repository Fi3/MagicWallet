// @flow


import * as Immutable from 'immutable';
import ImmutableModel from 'flow-immutable-models';


export type InOut
  = "In"
  | "Out"


export type WalletModelType = 
  //
  // pubKey is the address of the wallet like an IBAN
  //
  { privKey : string
  , pubKey : string
  };


export type TransactionModelType =
  { sign : InOut
  , amount : number
  , counterparty : string
  }


export type ModelModelType =
  { wallet : WalletModelType
	, transactions : Array<TransactionModelType>
  };

// /////////////////////////////////////////////////////////////////////////////
//
// NOTE: THIS CLASS IS GENERATED. DO NOT MAKE CHANGES HERE.
//
// If you need to update this class, update the corresponding flow type above
// and re-run the flow-immutable-models codemod
//
// /////////////////////////////////////////////////////////////////////////////
export class Wallet extends ImmutableModel {
  static fromJS(json: WalletModelType): Wallet {
    const state: Object = Object.assign({}, json);
    return new this(Immutable.Map(state));
  }

  toJS(): WalletModelType {
    return {
      privKey: this.privKey,
      pubKey: this.pubKey,
    };
  }

  get privKey(): string {
    return this._state.get('privKey');
  }

  setPrivKey(privKey: string): this {
    return this.clone(this._state.set('privKey', privKey));
  }

  get pubKey(): string {
    return this._state.get('pubKey');
  }

  setPubKey(pubKey: string): this {
    return this.clone(this._state.set('pubKey', pubKey));
  }
}

// /////////////////////////////////////////////////////////////////////////////
//
// NOTE: THIS CLASS IS GENERATED. DO NOT MAKE CHANGES HERE.
//
// If you need to update this class, update the corresponding flow type above
// and re-run the flow-immutable-models codemod
//
// /////////////////////////////////////////////////////////////////////////////
export class Transaction extends ImmutableModel {
  static fromJS(json: TransactionModelType): Transaction {
    const state: Object = Object.assign({}, json);
    return new this(Immutable.Map(state));
  }

  toJS(): TransactionModelType {
    return {
      sign: this.sign,
      amount: this.amount,
      counterparty: this.counterparty,
    };
  }

  get sign(): InOut {
    return this._state.get('sign');
  }

  setSign(sign: InOut): this {
    return this.clone(this._state.set('sign', sign));
  }

  get amount(): number {
    return this._state.get('amount');
  }

  setAmount(amount: number): this {
    return this.clone(this._state.set('amount', amount));
  }

  get counterparty(): string {
    return this._state.get('counterparty');
  }

  setCounterparty(counterparty: string): this {
    return this.clone(this._state.set('counterparty', counterparty));
  }
}

// /////////////////////////////////////////////////////////////////////////////
//
// NOTE: THIS CLASS IS GENERATED. DO NOT MAKE CHANGES HERE.
//
// If you need to update this class, update the corresponding flow type above
// and re-run the flow-immutable-models codemod
//
// /////////////////////////////////////////////////////////////////////////////
export class Model extends ImmutableModel {
  static fromJS(json: ModelModelType): Model {
    const state: Object = Object.assign({}, json);
    state.wallet = Wallet.fromJS(state.wallet);
    state.transactions = Immutable.List(state.transactions).map(item => Transaction.fromJS(item));
    return new this(Immutable.Map(state));
  }

  toJS(): ModelModelType {
    return {
      wallet: this.wallet.toJS(),
      transactions: this.transactions.toArray().map(item => item.toJS()),
    };
  }

  get wallet(): Wallet {
    return this._state.get('wallet');
  }

  setWallet(wallet: Wallet): this {
    return this.clone(this._state.set('wallet', wallet));
  }

  get transactions(): Immutable.List<Transaction> {
    return this._state.get('transactions');
  }

  setTransactions(transactions: Immutable.List<Transaction>): this {
    return this.clone(this._state.set('transactions', transactions));
  }
}
