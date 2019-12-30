export default class NegotiationsList {

  constructor() {
    this._negotiations = [];
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }

  empties() {
    this._negotiations = [];
  }

  get volumeTotal() {
    return this._negotiations.reduce((total, negotiation) => (total += negotiation.volume), 0)
  }

  order(criterion) {
    this._negotiations.sort(criterion);
  }

  orderReverse() {
    this._negotiations.reverse();
  }

}