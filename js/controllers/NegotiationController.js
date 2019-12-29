// import Negotiation from '../models/Negotiation.js';
// import NegotiationsService from '../services/NegotiationsService.js';
// import Bind from '../helpers/Bind.js';

// import NegotiationsList from '../models/NegotiationsList.js';
// import NegotiationsView from '../views/NegotiationsView.js';
// import Message from '../models/Message.js';
// import MessageView from '../views/MessageView.js';

// import DateHelper from '../helpers/DateHelper.js';

// import ConnectionFactory from '../services/ConnectionFactory.js';
// import NegotiationDAO from '../dao/NegotiationDAO.js';

class NegotiationController {

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

    this._negotiationsService = new NegotiationsService();

    this._init();
  }

  _init() {

    this._negotiationsService.toList()
      .then(negotiations =>
        negotiations.forEach(negotiation => this._negotiationsList.add(negotiation))
      )
      .catch(error => this._message.text = error)

    setInterval(() => {
      this.importNegotiations();
    }, 2000);
  }

  add(event) {
    event.preventDefault();

    let negotiation = this._addNegotiation();

    this._negotiationsService.register(negotiation)
      .then((message) => {
        this._negotiationsList.add(negotiation);
        this._message.text = message;
        this._cleanForm();
      })
      .catch(error => this._message.text = error);

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

    this._negotiationsService.importNegotiations(this._negotiationsList.negotiations)
      .then(negotiations => {
        negotiations.forEach(negotiation => this._negotiationsList.add(negotiation));
        // this._message.text = 'Negociações importadas com sucesso.'
      })
      .catch((error) => this._message.text = error);

  }

  deleteNegotiations() {

    this._negotiationsService.delete()
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