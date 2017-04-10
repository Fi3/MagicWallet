// @flow


// For be sure that we are side effect free, views (react compoments) when respond
// to an event must calls mapper(action, payload) and nothing else.
// TODO this rule should be enforced with static checking or runtime errors
//
import React from 'react';
import type {Msg} from './Messages'
import {Transaction, Model, PayForm, ReciveForm} from './Models.js'
import type {Amount, Address} from './Models.js'
import {mapper} from './Messages.js'
import {update} from './Update.js'
import type {Render} from './Main.js'
import type {List} from 'immutable'
import {sumAmount} from './Utils.js'


function NewAddress(props) {
  function reset() {
    localStorage.clear();
    location.reload();
  }
  return <p className="level-item"><a className="button is-success" onClick={reset}>New Address</a></p>
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
  function onClick() {
    props.updater(mapper('Pay'))
  }
  const buttonStyle = {
    'width': '5em',
  }
  // TODO text is not centered in safari
  return (
    <button className="button is-large is-danger has-text-centered" style={buttonStyle} onClick={onClick}>PAY</button>
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
  const amount = props.transactions.reduce(sumAmount, 0)
  return (
    <div className="box has-text-centered">
      <p>
        <strong>TOTAL AMOUNT</strong>
      </p>
      <p>
        {amount}
      </p>
    </div>
    )}


function TxsOutHead(props) {
  return (
    <thead>
      <tr>
        <th><abbr title="PayedTo">Payed To</abbr></th>
        <th><abbr title="Amount">Amount</abbr></th>
        <th><abbr title="Currency">Currency</abbr></th>
      </tr>
    </thead>
  )}


function TxsOutBody(props : {transactions : List<Transaction>}) {
  function parseTx(tx : Transaction) {
    return (
      <tr>
        <th>{tx.counterparty}</th>
        <td>{tx.amount}</td>
        <td><i className="fa fa-btc" aria-hidden="true"></i></td>
      </tr>
    )}
  const txsOut = props.transactions.filter(tx => tx.sign === 'Out').map(parseTx)
  return <tbody>{txsOut}</tbody>
  }
  

function TxsOut(props : {transactions : List<Transaction>}) {
  return (
    <table className="table">
      <TxsOutHead />
      <TxsOutBody transactions={props.transactions}/>
    </table>
    )}


function TxsInHead(props) {
  return (
    <thead>
      <tr>
        <th><abbr title="RecivedFrom">Recived from</abbr></th>
        <th><abbr title="Amount">Amount</abbr></th>
        <th><abbr title="Currency">Currency</abbr></th>
      </tr>
    </thead>
  )}


function TxsInBody(props : {transactions : List<Transaction>}) {
  function parseTx(tx : Transaction) {
    return (
      <tr>
        <th>{tx.counterparty}</th>
        <td>{tx.amount}</td>
        <td><i className="fa fa-btc" aria-hidden="true"></i></td>
      </tr>
    )}
  const txsIn = props.transactions.filter(tx => tx.sign === 'In').map(parseTx)
  return <tbody>{txsIn}</tbody>
  }
  

function TxsIn(props : {transactions : List<Transaction>}) {
return (
  <table className="table">
    <TxsInHead />
    <TxsInBody transactions={props.transactions}/>
  </table>
  )}


function FirstRow(props : {model : Model, updater : (Msg) => Render}) {
  return (
    <div className="columns is-desktop">
      <div className="column">
        <div className="columns is-mobile">
          <div className="column">
            <TxsIn transactions={props.model.transactions}/>
          </div>
          <div className="column">
            <TxsOut transactions={props.model.transactions}/>
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
            <Total transactions={props.model.transactions}/>
          </div>
        </div>
      </div>
    </div>
    )}


function Alert(props : {message : string}) {
  return (
    <div className="columns">
      <div className="column has-text-centered">
        <a className="button is-outlined is-danger is-large">{props.message}</a>
      </div>
    </div>
  )}


// TODO View is not a type change name with view!!!
export function View(model : Model, render : Render) {
  function updater(message: Msg): Render {
    return update(model, message, render);
    }
  if (model.error != '') {
    return (
      <div>
        <Header />
        <FirstRow model={model} updater={updater}/>
        <Alert message={model.error}/>
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
