// @flow


// For be sure that we are side effect free, views (react compoments) when respond
// to an event must calls mapper(action, payload) and nothing else.
// TODO this rule should be enforced with static checking or runtime errors
//
import React from 'react';
import type {Msg} from './Messages'
import {Wallet, Transaction, Model, PayForm, ReciveForm} from './Models.js'
import type {Amount, Address} from './Models.js'
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


function AmountInput(props : {amount : Amount, onInput : mixed}) {
  let amount
  let placeholder
  if (props.amount === 'Wrong') {
    placeholder = 'Amount should be an int bigger than 0'
    amount = ''
  }
  else {
    placeholder = 'Amount'
    amount = props.amount
  }
  return (
    <input className="input is-medium" type="number" placeholder={placeholder} onInput={props.onInput} value={amount}></input>
  )}


function AddressInput(props : {address : Address, onInput : mixed}) {
  return (
    <input className="input is-medium" type="text" placeholder="Address" onInput={props.onInput} value={props.address}></input>
  )}


function PayAmountInput(props : {amount : Amount, updater : (Msg) => Render}) {
  function onInput(event) {
    props.updater(mapper('UpdateAmountPayForm', event.target.value))
  }
  return (
    <div>
      Amount to pay:
      <AmountInput amount={props.amount} onInput={onInput} />
    </div>
  )}


function ReciveAmountInput(props : {amount : Amount, updater : (Msg) => Render}) {
  function onInput(event) {
    props.updater(mapper('UpdateAmountReciveForm', event.target.value))
  }
  return (
    <div>
      Amount to recive:
      <AmountInput amount={props.amount} onInput={onInput} />
    </div>
  )}


function PayAddressInput(props : {address : Address, updater : (Msg) => Render}) {
  function onInput(event) {
    props.updater(mapper('UpdateAddressPayForm', event.target.value))
  }
  return (
    <div>
      Who should be payed from you:
      <AddressInput address={props.address} updater={props.updater} onInput={onInput} />
    </div>
  )}


function ReciveAddressInput(props : {address : Address, updater : (Msg) => Render}) {
  function onInput(event) {
    props.updater(mapper('UpdateAddressReciveForm', event.target.value))
  }
  return (
    <div>
      Who is paying you:
      <AddressInput address={props.address} updater={props.updater} onInput={onInput} />
    </div>
  )}


function PayButton(props : {updater : (Msg) => Render}) {
  const buttonStyle = {
    'width': '5em',
  }
  // TODO text is not centered in safari
  return (
    <button className="button is-large is-danger has-text-centered" style={buttonStyle}>PAY</button>
  )}


function ReciveButton(props : {updater : (Msg) => Render}) {
  function onClick() {
    props.updater(mapper('Recive'))
  }
  const buttonStyle = {
    'width': '5em',
  }
  // TODO text is not centered in safari
  return (
    <button className="button is-large is-primary has-text-centered" style={buttonStyle} onClick={onClick}>RECIVE</button>
  )}


function PayTo(props : {payForm : PayForm, updater : (Msg) => Render}) {
  return (
    <div>
      <div className="columns">
        <div className="column">
          <PayAddressInput address={props.payForm.address} updater={props.updater}/>
        </div>
        <div className="column">
          <PayAmountInput amount={props.payForm.amount} updater={props.updater}/>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <PayButton updater={props.updater}/>
        </div>
      </div>
    </div>
   )}


function Recive(props : {reciveForm : ReciveForm, updater : (Msg) => Render}) {
  return (
    <div>
      <div className="columns">
        <div className="column">
          <ReciveAddressInput address={props.reciveForm.address} updater={props.updater}/>
        </div>
        <div className="column">
          <ReciveAmountInput amount={props.reciveForm.amount} updater={props.updater}/>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <ReciveButton updater={props.updater}/>
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


function FirstRow(props : {model : Model, updater : (Msg) => Render}) {
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
            <PayTo payForm={props.model.payForm} updater={props.updater}/>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Recive reciveForm={props.model.reciveForm} updater={props.updater}/>
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
  function updater(message: Msg): Render {
    return update(model, message, render);
    }
  if (model.payForm.amount === 'Wrong' || model.reciveForm.amount === 'Wrong') {
    return (
      <div>
        <Header />
        <FirstRow model={model} updater={updater}/>
        <Alert />
      </div>)
  }
  else {
    return (
      <div>
        <Header />
        <FirstRow model={model} updater={updater}/>
      </div>)
  }
  }

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
