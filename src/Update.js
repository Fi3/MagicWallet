// @flow


import * as Immutable from 'immutable'
import {Model} from './Models.js'
import type {Msg} from './Messages.js'
import {View} from './View.js'
import {mapper} from './Messages.js'
import type {Render} from './Main.js'


export function update(model: Model, message: Msg, render : any): Render {
  //
  // `update` take a `Model` and a 'Message` and call `render` with the updated `Model`
  // or if `Message == 'None` it create the `View` with model.
  // TODO check if is better never return a `View` and always call `render` with the updated `Model`
  // and let the task to create a new `View` to another function
  //
  let updatedModel;
  let newView;
  switch (message.type) {
    case 'Pay':
      updatedModel = model.set('transactions', Immutable.List([message.payload]));
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));

    case 'UpdateAddressPayForm':
      updatedModel = model.setIn(['payForm','address'], message.payload);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));

    case 'UpdateAddressReciveForm':
      updatedModel = model.setIn(['reciveForm','address'], message.payload);
      newView = View(updatedModel, render);
      return render(updatedModel, mapper('None'));

    case 'None':
      {/* $FlowFixMe */}
      return View(model, render)

    // Make flow check for exhaustiveness ty to gcanti
    // ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
    // TODO make helper function to reuse this pattern
    default:
      (message.type: empty);
      throw 'unknown action';
    };
}
