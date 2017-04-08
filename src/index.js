import React from 'react';
//import {view} from './View.js';
import {initialView} from './Main.js'
import ReactDom from 'react-dom';
require('./index.html');


const mountNode = document.getElementById('main');

ReactDom.render(initialView, mountNode);


//function(model, view, mountNode) {
//  ReactDom.render(View, mountNode);
//  }
