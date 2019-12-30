import Negotiation from "../models/Negotiation";

export default class NegotiationDAO {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negotiations';
  }

  insert(negotiation) {

    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negotiation);

      request.onsuccess = (e) => {
        resolve();
      }

      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível adicionar a negociação!');
      }
    });

  }

  findAll() {

    return new Promise((resolve, reject) => {
      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      let negotiations = [];

      cursor.onsuccess = (e) => {

        let currentElement = e.target.result;

        if (currentElement) {

          let data = currentElement.value;
          negotiations.push(new Negotiation(data._date, data._quantity, data._value));

          currentElement.continue();

        } else {
          resolve(negotiations);
        }

      }

      cursor.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível listar as negociações!');
      }

    });

  }

  deleteAll() {

    return new Promise((resolve, reject) => {

      let request = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = (e) => resolve('Negociações apagadas com sucesso!');

      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível apagar as negociações!');
      }

    });

  }

}