// @flow


import React from 'react';
import {View} from './View.js';
import ReactDom from 'react-dom';
// $FlowFixMe
require('./index.html');


const mountNode = document.getElementById('main');


ReactDom.render(<View name="Wallet" />, mountNode);
