"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, NegotiationsList;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      NegotiationsList = function () {
        function NegotiationsList() {
          _classCallCheck(this, NegotiationsList);

          this._negotiations = [];
        }

        _createClass(NegotiationsList, [{
          key: "add",
          value: function add(negotiation) {
            this._negotiations.push(negotiation);
          }
        }, {
          key: "empties",
          value: function empties() {
            this._negotiations = [];
          }
        }, {
          key: "order",
          value: function order(criterion) {
            this._negotiations.sort(criterion);
          }
        }, {
          key: "orderReverse",
          value: function orderReverse() {
            this._negotiations.reverse();
          }
        }, {
          key: "negotiations",
          get: function get() {
            return [].concat(this._negotiations);
          }
        }, {
          key: "volumeTotal",
          get: function get() {
            return this._negotiations.reduce(function (total, negotiation) {
              return total += negotiation.volume;
            }, 0);
          }
        }]);

        return NegotiationsList;
      }();

      _export("default", NegotiationsList);
    }
  };
});
//# sourceMappingURL=NegotiationsList.js.map