import Negotiation from '../models/Negotiation.js';
import NegotiationsService from '../services/NegotiationsService.js';
import Bind from '../helpers/Bind.js';

import NegotiationsList from '../models/NegotiationsList.js';
import NegotiationsView from '../views/NegotiationsView.js';
import Message from '../models/Message.js';
import MessageView from '../views/MessageView.js';

import DateHelper from '../helpers/DateHelper.js';

import ConnectionFactory from '../services/ConnectionFactory.js';
import NegotiationDAO from '../dao/NegotiationDAO.js';

export default class NegotiationController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputQuantity = $('#quantidade');
    this._inputValue = $('#valor');
    this._currentOrder = '';

    this._negotiationsList = new Bind(
      new NegotiationsList(),
      new NegotiationsView($('#negociacoesView')),
      'add', 'empties', 'order', 'orderReverse'
    );

    this._message = new Bind(
      new Message(),
      new MessageView($('#mensagemView')),
      'text'
    );

    ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection))
      .then(dao => dao.findAll())
      .then(negotiations => negotiations.forEach(negotiation => this._negotiationsList.add(negotiation)))
      .catch(error => {
        console.log(error);
        this._message.text = error;
      })

  }

  add(event) {
    // event.preventDefault();

    ConnectionFactory.getConnection().then(connection => {

      let negotiation = this._addNegotiation();

      new NegotiationDAO(connection).insert(negotiation).then(() => {

        this._negotiationsList.add(negotiation);
        this._message.text = 'Negociação adicionada com sucesso!';
        this._cleanForm();

      });

    }).catch(error => this._message.text = error);

  }

  order(column) {
    if (this._currentOrder == column) {
      this._negotiationsList.orderReverse();
    } else {
      this._negotiationsList.order((current, next) => current[column] - next[column]);
    }
    this._currentOrder = column;
  }

  importNegotiations() {
    let negotiationsService = new NegotiationsService();

    Promise.all([

      negotiationsService.getNegotiationsWeek(),
      negotiationsService.getNegotiationsWeekPrevious(),
      negotiationsService.getNegotiationsWeekPreviousToLast(),

    ]).then(negotiations => {

      negotiations.reduce((newArray, currentArray) => newArray.concat(currentArray), [])
        .forEach(negotiation => this._negotiationsList.add(negotiation));
      this._message.text = 'Negociações importadas com sucesso.'

    }).catch((error) => this._message.text = error);

  }

  deleteNegotiations() {

    ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection))
      .then(dao => dao.deleteAll())
      .then(message => {
        this._message.text = message;
        this._negotiationsList.empties();
        this._cleanForm();
      })
      .catch(error => this._message.text = error);

  }

  _addNegotiation() {
    return new Negotiation(
      DateHelper.convertTextToDate(this._inputDate.value),
      parseInt(this._inputQuantity.value),
      parseFloat(this._inputValue.value)
    );
  }

  _cleanForm() {
    this._inputDate.value = '';
    this._inputQuantity.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();
  }

}