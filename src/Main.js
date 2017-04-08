// @flow


import ReactDom from 'react-dom';
import type {InOut} from './Models.js'
import {Wallet, Transaction, Model} from './Models.js'
import {View} from './View.js';
import type {Msg} from './Messages.js'
import {update} from './Update.js'
import {mapper} from './Messages.js'


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


// Initialize app TODO move Render run in Render.js


// Little hack for make sure that flow complain when `update` return a `View`
// and we forgot to pass `render` to the `view`.
// TODO find better way to do that
export type Render
  = 'Render'

function run(model : Model, message : Msg, update : any, mountNode : any){
  function render(model: Model, message : Msg) : Render {
    //
    // `render` is the engine of the app: it can acces `mountNode` and `update` so when
    // we pass  `Model` and  `Message` to `render` it can create a `View` with 
    // `update` `model` and `message`.
    // `render` can also render the `view` beacouse it know `mountNode`.
    //
    // `Update` return a `view` when `Message` is `None`.
    // But  when `Message` is `!=None` `update` change the `Model` and than call again `render`
    // with the new `Model`. For that we have always pass `render` to update. This can also create
    // infinite loops.
    // TODO find a solution to make sure that will be impossible to have ininite loops with
    // ..->update->render->update->..
    //
    const newView = update(model, message, render);
    ReactDom.render(newView, mountNode);
    return 'Render'
  }
  render(model, message);
}

export function app(mountNode : any) {
  return run(initialModel, mapper('None'), update, mountNode);
}
