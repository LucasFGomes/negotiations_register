'use strict';

System.register(['../services/NegotiationsService', '../models/Negotiation', '../models/NegotiationsList', '../models/Message', '../views/NegotiationsView', '../views/MessageView', '../helpers/Bind', '../helpers/DateHelper'], function (_export, _context) {
  "use strict";

  var NegotiationsService, Negotiation, NegotiationsList, Message, NegotiationsView, MessageView, Bind, DateHelper, _createClass, NegotiationController, negotiationController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesNegotiationsService) {
      NegotiationsService = _servicesNegotiationsService.default;
    }, function (_modelsNegotiation) {
      Negotiation = _modelsNegotiation.default;
    }, function (_modelsNegotiationsList) {
      NegotiationsList = _modelsNegotiationsList.default;
    }, function (_modelsMessage) {
      Message = _modelsMessage.default;
    }, function (_viewsNegotiationsView) {
      NegotiationsView = _viewsNegotiationsView.default;
    }, function (_viewsMessageView) {
      MessageView = _viewsMessageView.default;
    }, function (_helpersBind) {
      Bind = _helpersBind.default;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      NegotiationController = function () {
        function NegotiationController() {
          _classCallCheck(this, NegotiationController);

          var $ = document.querySelector.bind(document);
          this._inputDate = $('#data');
          this._inputQuantity = $('#quantidade');
          this._inputValue = $('#valor');
          this._currentOrder = '';

          this._negotiationsList = new Bind(new NegotiationsList(), new NegotiationsView($('#negociacoesView')), 'add', 'empties', 'order', 'orderReverse');

          this._message = new Bind(new Message(), new MessageView($('#mensagemView')), 'text');

          this._negotiationsService = new NegotiationsService();

          this._init();
        }

        _createClass(NegotiationController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._negotiationsService.toList().then(function (negotiations) {
              return negotiations.forEach(function (negotiation) {
                return _this._negotiationsList.add(negotiation);
              });
            }).catch(function (error) {
              return _this._message.text = error;
            });

            setInterval(function () {
              _this.importNegotiations();
            }, 2000);
          }
        }, {
          key: 'add',
          value: function add(event) {
            var _this2 = this;

            event.preventDefault();

            var negotiation = this._addNegotiation();

            this._negotiationsService.register(negotiation).then(function (message) {
              _this2._negotiationsList.add(negotiation);
              _this2._message.text = message;
              _this2._cleanForm();
            }).catch(function (error) {
              return _this2._message.text = error;
            });
          }
        }, {
          key: 'order',
          value: function order(column) {
            if (this._currentOrder == column) {
              this._negotiationsList.orderReverse();
            } else {
              this._negotiationsList.order(function (current, next) {
                return current[column] - next[column];
              });
            }
            this._currentOrder = column;
          }
        }, {
          key: 'importNegotiations',
          value: function importNegotiations() {
            var _this3 = this;

            this._negotiationsService.importNegotiations(this._negotiationsList.negotiations).then(function (negotiations) {
              negotiations.forEach(function (negotiation) {
                return _this3._negotiationsList.add(negotiation);
              });
              // this._message.text = 'Negociações importadas com sucesso.'
            }).catch(function (error) {
              return _this3._message.text = error;
            });
          }
        }, {
          key: 'deleteNegotiations',
          value: function deleteNegotiations() {
            var _this4 = this;

            this._negotiationsService.delete().then(function (message) {
              _this4._message.text = message;
              _this4._negotiationsList.empties();
              _this4._cleanForm();
            }).catch(function (error) {
              return _this4._message.text = error;
            });
          }
        }, {
          key: '_addNegotiation',
          value: function _addNegotiation() {
            return new Negotiation(DateHelper.convertTextToDate(this._inputDate.value), parseInt(this._inputQuantity.value), parseFloat(this._inputValue.value));
          }
        }, {
          key: '_cleanForm',
          value: function _cleanForm() {
            this._inputDate.value = '';
            this._inputQuantity.value = 1;
            this._inputValue.value = 0.0;
            this._inputDate.focus();
          }
        }]);

        return NegotiationController;
      }();

      negotiationController = new NegotiationController();
      function currentInstance() {
        return negotiationController;
      }

      _export('currentInstance', currentInstance);
    }
  };
});
//# sourceMappingURL=NegotiationController.js.map