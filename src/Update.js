// @flow


import * as Immutable from 'immutable'
import {Model} from './Models.js'
import type {Msg} from './Messages.js'
import {View} from './View.js'


export function update(model: Model, message: Msg) {
  switch (message.type) {
    case 'Pay':
      const updatedModel = model.set('transactions', message.payload);
      const newView = View(updatedModel);
      //console.log(Date.now());
      //console.log(h.get('transactions'));
      return newView;

		// Make flow check for exhaustiveness ty to gcanti
		// ref http://stackoverflow.com/questions/40338895/sealed-case-classes-in-flow
		// TODO make helper function to reuse this pattern
    default:
			(message.type: empty);
      throw 'unknown action';
    };
}

//export function updater(model: Model, message: Msg) {
