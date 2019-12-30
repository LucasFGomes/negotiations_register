'use strict';

System.register(['./View', '../helpers/DateHelper', '../controllers/NegotiationController'], function (_export, _context) {
  "use strict";

  var View, DateHelper, currentInstance, _createClass, NegotiationsView;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_View2) {
      View = _View2.default;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.default;
    }, function (_controllersNegotiationController) {
      currentInstance = _controllersNegotiationController.currentInstance;
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

      NegotiationsView = function (_View) {
        _inherits(NegotiationsView, _View);

        function NegotiationsView(element) {
          _classCallCheck(this, NegotiationsView);

          var _this = _possibleConstructorReturn(this, (NegotiationsView.__proto__ || Object.getPrototypeOf(NegotiationsView)).call(this, element));

          element.addEventListener('click', function (event) {

            if (event.target.nodeName == 'TH') {
              currentInstance().order(event.target.textContent.toLowerCase());
            }
          });
          return _this;
        }

        _createClass(NegotiationsView, [{
          key: 'template',
          value: function template(model) {
            return '\n      <table class="table table-hover table-bordered">\n        <thead>\n          <tr>\n            <th style="cursor: pointer;">DATA</th>\n            <th style="cursor: pointer;">QUANTIDADE</th>\n            <th style="cursor: pointer;">VALOR</th>\n            <th style="cursor: pointer;">VOLUME</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          ' + model.negotiations.map(function (negotiation) {
              return '\n            <tr>\n              <td>' + DateHelper.convertDateToText(negotiation.date) + '</td>\n              <td>' + negotiation.quantity + '</td>\n              <td>' + negotiation.value + '</td>\n              <td>' + negotiation.volume + '</td>\n            </tr>\n          ';
            }).join('') + '\n        </tbody>\n\n        <tfoot>\n          ' + (model.negotiations.length > 0 ? '\n            <td colspan="3" style="font-weight: bold">TOTAL</td>\n            <td>' + model.volumeTotal + '</td>\n          ' : '') + '\n        </tfoot>\n      </table>\n    ';
          }
        }]);

        return NegotiationsView;
      }(View);

      _export('default', NegotiationsView);
    }
  };
});
//# sourceMappingURL=NegotiationsView.js.map