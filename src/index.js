import React from 'react';
//import {view} from './View.js';
import {app} from './Main.js'
import ReactDom from 'react-dom';
require('./index.html');


const mountNode = document.getElementById('main');
app(mountNode);
//ReactDom.render(initialView, mountNode);


//function(model, view, mountNode) {
//  ReactDom.render(View, mountNode);
//  }
