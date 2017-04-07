

import React from 'react';
import {View} from './View.js';
import ReactDom from 'react-dom';
// $FlowFixMe
require('./index.html');


const mountNode = document.getElementById('main');


ReactDom.render(View, mountNode);


function(model, view, mountNode) {
  ReactDom.render(View, mountNode);
  }
