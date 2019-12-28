import Negotiation from '../models/Negotiation.js';
import HttpService from '../services/HttpService.js';

export default class NegotiationsService {

  constructor() {
    this._httpService = new HttpService();
  }

  getNegotiationsWeek() {
    return new Promise((resolve, reject) => {

      this._httpService.get('negociacoes/semana').then((negotiations) => {
        resolve(negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor)));
      }).catch((error) => {
        console.log(error);
        reject('Não foi possível importar as negociaçoes da semana.');
      });

    });
  }

  getNegotiationsWeekPrevious() {
    return new Promise((resolve, reject) => {

      this._httpService.get('negociacoes/anterior').then((negotiations) => {
        resolve(negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor)));
      }).catch((error) => {
        console.log(error);
        reject('Não foi possível importar as negociaçoes da semana anterior.');
      });

    });
  }

  getNegotiationsWeekPreviousToLast() {
    return new Promise((resolve, reject) => {

      this._httpService.get('negociacoes/retrasada').then((negotiations) => {
        resolve(negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor)));
      }).catch((error) => {
        console.log(error);
        reject('Não foi possível importar as negociaçoes da semana retrasada.');
      });

    });
  }
}