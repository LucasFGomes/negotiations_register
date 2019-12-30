'use strict';

System.register(['./controllers/NegotiationController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negotiationController;
  return {
    setters: [function (_controllersNegotiationController) {
      currentInstance = _controllersNegotiationController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negotiationController = currentInstance();


      document.querySelector('#form').onsubmit = negotiationController.add.bind(negotiationController);
      document.querySelector('#clear').onclick = negotiationController.deleteNegotiations.bind(negotiationController);
    }
  };
});
//# sourceMappingURL=boot.js.map