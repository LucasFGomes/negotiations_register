import View from './View';
import DateHelper from '../helpers/DateHelper';
import { currentInstance } from '../controllers/NegotiationController';

export default class NegotiationsView extends View {

  constructor(element) {
    super(element);

    element.addEventListener('click', function (event) {

      if (event.target.nodeName == 'TH') {
        currentInstance().order(event.target.textContent.toLowerCase());
      }

    });
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th style="cursor: pointer;">DATA</th>
            <th style="cursor: pointer;">QUANTIDADE</th>
            <th style="cursor: pointer;">VALOR</th>
            <th style="cursor: pointer;">VOLUME</th>
          </tr>
        </thead>

        <tbody>
          ${model.negotiations.map((negotiation) => `
            <tr>
              <td>${DateHelper.convertDateToText(negotiation.date)}</td>
              <td>${negotiation.quantity}</td>
              <td>${negotiation.value}</td>
              <td>${negotiation.volume}</td>
            </tr>
          `).join('')}
        </tbody>

        <tfoot>
          ${model.negotiations.length > 0 ? `
            <td colspan="3" style="font-weight: bold">TOTAL</td>
            <td>${model.volumeTotal}</td>
          ` : ''}
        </tfoot>
      </table>
    `
  }

}