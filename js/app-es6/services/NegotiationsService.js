import Negotiation from '../models/Negotiation';
import HttpService from './HttpService';
import NegotiationDAO from '../dao/NegotiationDAO';
import ConnectionFactory from '../services/ConnectionFactory';

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

  getNegotiations() {

    return Promise.all([
      this.getNegotiationsWeek(),
      this.getNegotiationsWeekPrevious(),
      this.getNegotiationsWeekPreviousToLast(),
    ]).then((periods) => {

      let negotiations = periods.reduce((data, period) => data.concat(period), []);
      return negotiations;

    }).catch(error => {
      throw new Error(error)
    });

  }

  register(negotiation) {

    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection))
      .then(dao => dao.insert(negotiation))
      .then(() => 'Negociação adicionada com sucesso!')
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível adicionar a negociação.');
      });

  }

  toList() {

    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection))
      .then(dao => dao.findAll())
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível obter as negociações.');
      });

  }

  delete() {

    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection))
      .then(dao => dao.deleteAll())
      .then(() => 'Negociações apagadas com sucesso.')
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível apagar as negociações.');
      });

  }

  importNegotiations(currentList) {

    return this.getNegotiations()
      .then(negotiations =>
        negotiations.filter(negotiation =>
          !currentList.some(negotiationExisting => negotiation.equals(negotiationExisting)))
      )
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível importar as negociações.');
      })

  }

}