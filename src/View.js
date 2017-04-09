// @flow


// For be sure that we are side effect free, views (react compoments) when respond
// to an event must calls mapper(action, payload) and nothing else.
// TODO this rule should be enforced with static checking or runtime errors
//
import React from 'react';
import type {TransactionModelType, WalletModelType, ModelModelType} from './Models.js';
import type {Msg} from './Messages'
import {Wallet, Transaction, Model} from './Models.js'
import {mapper} from './Messages.js'
import {update} from './Update.js'
import type {Render} from './Main.js'


function NewAddress(props) {
  return <p className="level-item"><a className="button is-success">New Address</a></p>
}


function Header(props) {
  return (
    <div className="box">
    <nav className="level">
      <div className="level-left">
        <a className="level-item" href="https://github.com/Fi3/magicwallet" target="_blank">
          <span className="icon is-large is-centred"><i className="fa fa-credit-card" ></i></span>
        </a>
      </div>
      <div className="level-right">
				<NewAddress />
        <nav className="level">
          <a className="level-item" href="https://github.com/Fi3/magicwallet" target="_blank">
            <span className="icon is-large is-centred"><i className="fa fa-github" ></i></span>
          </a>
        </nav>
      </div>
    </nav>
    </div>
  )}


function PayTo(props) {
  const buttonStyle = {
    'width': '5em',
    'textAlign': 'center !important',
  };
  return (
		<div>
    <div className="columns">
		  <div className="column">
		    <div className="field">
		    	<p className="control">
		    		<input className="input is-medium" type="text" placeholder="Pay to address">
		    		</input>
		    	</p>
		    </div>
			</div>
		  <div className="column">
		    <div className="field">
		    	<p className="control">
		    		<input className="input is-medium" type="number" placeholder="Amount to pay">
		    		</input>
		    	</p>
		    </div>
			</div>
		</div>
    <div className="columns">
		  <div className="column has-text-centered">
        {/* TODO text is not centered in safari */}
			  <button className="button is-large is-danger" style={buttonStyle}>PAY</button>
			</div>
    </div>
    </div>
		)}

function Recive(props) {
  const buttonStyle = {
    'width': '5em',
  };
  return (
		<div>
    <div className="columns">
		  <div className="column">
		    <div className="field">
		    	<p className="control">
		    		<input className="input is-medium" type="text" placeholder="Recive from">
		    		</input>
		    	</p>
		    </div>
			</div>
		  <div className="column">
		    <div className="field">
		    	<p className="control">
		    		<input className="input is-medium" type="number" placeholder="Amount to recive">
		    		</input>
		    	</p>
		    </div>
			</div>
		</div>
    <div className="columns">
		  <div className="column has-text-centered">
        {/* TODO text is not centered in safari */}
			  <button className="button is-large is-primary" style={buttonStyle}>RECIVE</button>
			</div>
    </div>
    </div>
		)}

function Total(props) {
  return (
    <div className="box has-text-centered">
			<p>
				<strong>TOTAL AMOUNT</strong>
			</p>
			<p>
        56.56543
			</p>
    </div>
		)}


function FirstRow(props) {
  return (
    <div className="columns is-desktop">
      <div className="column">
        <div className="columns is-mobile">
          <div className="column">
            <TxsOutMokup />
          </div>
          <div className="column">
            <TxsOutMokup />
          </div>
        </div>
      </div>
      <div className="column">
        <div className="columns">
          <div className="column">
            <PayTo />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Recive />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Total />
          </div>
        </div>
      </div>
    </div>
    )}


function Alert(props) {
  return (
    <div className="columns">
      <div className="column has-text-centered">
        <a className="button is-outlined is-danger is-large">Amount should be a number</a>
      </div>
    </div>
  )}


// TODO View is not a type change name with view!!!
export function View(model : Model, render : Render) {
  function updater(message: Msg) {
    update(model, message, render);
    }
  return (
  <div>
    <Header />
    <FirstRow />
    <Alert />
  </div>
);}

function TxsOutMokup(props) {
return (
<table className="table">
  <thead>
    <tr>
      <th><abbr title="PayedTo">Payed To</abbr></th>
      <th><abbr title="Amount">Amount</abbr></th>
      <th><abbr title="Currency">Currency</abbr></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <th>Mario</th>
      <td>38</td>
      <td><i className="fa fa-btc" aria-hidden="true"></i></td>
    </tr>
  </tbody>
</table>
)}
