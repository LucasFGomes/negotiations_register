import { currentInstance } from './controllers/NegotiationController';
import { } from './polyfill/fetch';

let negotiationController = currentInstance();

document.querySelector('#form').onsubmit = negotiationController.add.bind(negotiationController);
document.querySelector('#clear').onclick = negotiationController.deleteNegotiations.bind(negotiationController);