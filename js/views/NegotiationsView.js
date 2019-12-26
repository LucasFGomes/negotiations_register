class NegotiationsView extends View {

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th style="cursor: pointer;" onclick="negotiationController.order('date')">DATA</th>
            <th style="cursor: pointer;" onclick="negotiationController.order('quantity')">QUANTIDADE</th>
            <th style="cursor: pointer;" onclick="negotiationController.order('value')">VALOR</th>
            <th style="cursor: pointer;" onclick="negotiationController.order('volume')">VOLUME</th>
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