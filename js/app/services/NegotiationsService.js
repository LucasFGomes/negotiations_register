'use strict';

System.register(['../models/Negotiation', './HttpService', '../dao/NegotiationDAO', '../services/ConnectionFactory'], function (_export, _context) {
  "use strict";

  var Negotiation, HttpService, NegotiationDAO, ConnectionFactory, _createClass, NegotiationsService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsNegotiation) {
      Negotiation = _modelsNegotiation.default;
    }, function (_HttpService) {
      HttpService = _HttpService.default;
    }, function (_daoNegotiationDAO) {
      NegotiationDAO = _daoNegotiationDAO.default;
    }, function (_servicesConnectionFactory) {
      ConnectionFactory = _servicesConnectionFactory.default;
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

      NegotiationsService = function () {
        function NegotiationsService() {
          _classCallCheck(this, NegotiationsService);

          this._httpService = new HttpService();
        }

        _createClass(NegotiationsService, [{
          key: 'getNegotiationsWeek',
          value: function getNegotiationsWeek() {
            var _this = this;

            return new Promise(function (resolve, reject) {

              _this._httpService.get('negociacoes/semana').then(function (negotiations) {
                resolve(negotiations.map(function (obj) {
                  return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                }));
              }).catch(function (error) {
                console.log(error);
                reject('Não foi possível importar as negociaçoes da semana.');
              });
            });
          }
        }, {
          key: 'getNegotiationsWeekPrevious',
          value: function getNegotiationsWeekPrevious() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

              _this2._httpService.get('negociacoes/anterior').then(function (negotiations) {
                resolve(negotiations.map(function (obj) {
                  return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                }));
              }).catch(function (error) {
                console.log(error);
                reject('Não foi possível importar as negociaçoes da semana anterior.');
              });
            });
          }
        }, {
          key: 'getNegotiationsWeekPreviousToLast',
          value: function getNegotiationsWeekPreviousToLast() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

              _this3._httpService.get('negociacoes/retrasada').then(function (negotiations) {
                resolve(negotiations.map(function (obj) {
                  return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                }));
              }).catch(function (error) {
                console.log(error);
                reject('Não foi possível importar as negociaçoes da semana retrasada.');
              });
            });
          }
        }, {
          key: 'getNegotiations',
          value: function getNegotiations() {

            return Promise.all([this.getNegotiationsWeek(), this.getNegotiationsWeekPrevious(), this.getNegotiationsWeekPreviousToLast()]).then(function (periods) {

              var negotiations = periods.reduce(function (data, period) {
                return data.concat(period);
              }, []);
              return negotiations;
            }).catch(function (error) {
              throw new Error(error);
            });
          }
        }, {
          key: 'register',
          value: function register(negotiation) {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.insert(negotiation);
            }).then(function () {
              return 'Negociação adicionada com sucesso!';
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível adicionar a negociação.');
            });
          }
        }, {
          key: 'toList',
          value: function toList() {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.findAll();
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações.');
            });
          }
        }, {
          key: 'delete',
          value: function _delete() {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.deleteAll();
            }).then(function () {
              return 'Negociações apagadas com sucesso.';
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível apagar as negociações.');
            });
          }
        }, {
          key: 'importNegotiations',
          value: function importNegotiations(currentList) {

            return this.getNegotiations().then(function (negotiations) {
              return negotiations.filter(function (negotiation) {
                return !currentList.some(function (negotiationExisting) {
                  return negotiation.equals(negotiationExisting);
                });
              });
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível importar as negociações.');
            });
          }
        }]);

        return NegotiationsService;
      }();

      _export('default', NegotiationsService);
    }
  };
});
//# sourceMappingURL=NegotiationsService.js.map