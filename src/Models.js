// @flow


import * as Immutable from 'immutable';
import ImmutableModel from 'flow-immutable-models';


export type WalletModelType = 
	{ address : string
	, privKey : string
	, pubKey : string
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
            address: this.address,
            privKey: this.privKey,
            pubKey: this.pubKey,
        };
    }

    get address(): string {
        return this._state.get('address');
    }

    setAddress(address: string): this {
        return this.clone(this._state.set('address', address));
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
