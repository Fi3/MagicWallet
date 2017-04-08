import React from 'react';
import {app} from './Main.js'
import ReactDom from 'react-dom';
require('./index.html');


const mountNode = document.getElementById('main');
app(mountNode);
