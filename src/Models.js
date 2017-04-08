// @flow


import * as Immutable from 'immutable';


// Ugly Fix TODO find better solution .Í have copied this type here becaouse
// webpack complain when I try to import flow-immutable-models
export type Updater<TProp> = (oldValue: TProp) => TProp;


// Ugly Fix TODO find better solution .Í have copied this class here becaouse
// webpack complain when I try to import flow-immutable-models
class ImmutableModel {
  _state: Immutable.Map<string, any>;

  constructor(state: Immutable.Map<any, any>) {
    this._state = state;
  }

  getState() {
    return this._state;
  }

  clone(value: Immutable.Map<string, any>): this {
    const constructor = this.constructor;
    return value === this._state ? this : new constructor(value);
  }

  get(property: string): any {
    return this._state.get(property);
  }

  set(property: string, value: any): this {
    return this.clone(this._state.set(property, value));
  }

  update<TProp>(property: string, updater: Updater<TProp>): this {
    return this.clone(this._state.update(property, updater));
  }

  getIn(properties: string[]): any {
    return this._state.getIn(properties);
  }

  setIn(properties: string[], value: any): this {
    return this.clone(this._state.setIn(properties, value));
  }

  updateIn<TProp>(
    properties: Array<string | number>,
    notSetValue: TProp | Updater<TProp>,
    updater?: Updater<TProp>,
  ): this {
    return this.clone(this._state.updateIn(properties, notSetValue, updater));
  }

  has(property: string): boolean {
    return this._state.has(property);
  }

  equals(other: any): boolean {
    return this._state.equals(other);
  }

  addToMap<TKey, TValue>(property: string, key: TKey, value: TValue): this {
    const map: Immutable.Map<TKey, TValue> = this.get(property);
    return this.clone(this._state.set(property, map.set(key, value)));
  }

  removeFromMap<TKey, TValue>(property: string, key: TKey): this {
    const map: Immutable.Map<TKey, TValue> = this.get(property);
    return this.clone(this._state.set(property, map.remove(key)));
  }

  addToList<TProp>(property: string, value: TProp): this {
    return this.clone(this._state.update(property, Immutable.List(), lst => lst.push(value)));
  }

  concatToList<TProp>(property: string, ...value: Array<TProp>): this {
    return this.clone(this._state.update(property, Immutable.List(), lst => lst.concat(...value)));
  }

  removeFromList<TProp>(property: string, index: number): this {
    const list: Immutable.List<TProp> = this.get(property);
    return this.clone(this._state.set(property, list.remove(index)));
  }

  addToSet<TProp>(property: string, value: TProp): this {
    const collection: Immutable.Set<TProp> = this.get(property);
    return this.clone(this._state.set(property, collection.add(value)));
  }

  removeFromSet<TProp>(property: string, value: TProp): this {
    const list: Immutable.Set<TProp> = this.get(property);
    return this.clone(this._state.set(property, list.remove(value)));
  }
}


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
  , transactions : Array<TransactionModelType> //TODO make transactions an immutable list
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
