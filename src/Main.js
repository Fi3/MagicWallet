// @flow


import type {InOut} from './Models.js'
import {Wallet, Transaction, Model} from './Models.js'
import {View} from './View.js';


// Initialize the Model (redux Store)


const initialWallet =
  { privKey : 'initializing ...'
  , pubKey : 'initializing ...'
  }


const inititialTransaction =
  { sign : 'In'
  , amount : 22
  , counterparty : 'foo'
  }


export const initialModel : Model =
  Model.fromJS(
  { wallet : initialWallet
  , transactions : [inititialTransaction]
  });


// Inintialize View and listen for message


export function renderPage(model : Model) {
  return View(model);
  }


export const initialView = renderPage(initialModel);
