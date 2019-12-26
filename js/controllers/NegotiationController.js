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
  }

  add(event) {
    event.preventDefault();

    this._negotiationsList.add(this._addNegotiation());
    this._message.text = 'Negociação adicionada com sucesso!';
    this._cleanForm();
  }

  order(column) {
    if (this._currentOrder == column) {
      this._negotiationsList.orderReverse();
    } else {
      this._negotiationsList.order((current, later) => current[column] - later[column]);
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
    this._negotiationsList.empties();
    this._message.text = "Negociações apagadas com sucesso!";
    this._cleanForm();
  }

  _addNegotiation() {
    return new Negotiation(
      DateHelper.convertTextToDate(this._inputDate.value),
      this._inputQuantity.value,
      this._inputValue.value
    );
  }

  _cleanForm() {
    this._inputDate.value = '';
    this._inputQuantity.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();
  }

}