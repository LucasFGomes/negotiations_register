'use strict';

System.register(['../models/Negotiation'], function (_export, _context) {
  "use strict";

  var Negotiation, _createClass, NegotiationDAO;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsNegotiation) {
      Negotiation = _modelsNegotiation.default;
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

      NegotiationDAO = function () {
        function NegotiationDAO(connection) {
          _classCallCheck(this, NegotiationDAO);

          this._connection = connection;
          this._store = 'negotiations';
        }

        _createClass(NegotiationDAO, [{
          key: 'insert',
          value: function insert(negotiation) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negotiation);

              request.onsuccess = function (e) {
                resolve();
              };

              request.onerror = function (e) {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação!');
              };
            });
          }
        }, {
          key: 'findAll',
          value: function findAll() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

              var negotiations = [];

              cursor.onsuccess = function (e) {

                var currentElement = e.target.result;

                if (currentElement) {

                  var data = currentElement.value;
                  negotiations.push(new Negotiation(data._date, data._quantity, data._value));

                  currentElement.continue();
                } else {
                  resolve(negotiations);
                }
              };

              cursor.onerror = function (e) {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações!');
              };
            });
          }
        }, {
          key: 'deleteAll',
          value: function deleteAll() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

              var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

              request.onsuccess = function (e) {
                return resolve('Negociações apagadas com sucesso!');
              };

              request.onerror = function (e) {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações!');
              };
            });
          }
        }]);

        return NegotiationDAO;
      }();

      _export('default', NegotiationDAO);
    }
  };
});
//# sourceMappingURL=NegotiationDAO.js.map