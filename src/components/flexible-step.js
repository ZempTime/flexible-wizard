import { LitElement, html } from 'lit-element';
import './flexible-field.js';

//  step machines
//      -> declare data needs (compose a gql query)
//      -> consume fields
//      -> communicate validity, form state
//      -> provide extensible custom validation hook
//      -> render logic

export class FlexibleStep extends LitElement {
  static get properties() {
    return {
      step: { type: Object },
    };
  }

  render() {
    return html`
      ${this.step.fields.map(
        f =>
          html`
            <flexible-field .field=${f}></flexible-field>
          `,
      )}
    `;
  }
}

window.customElements.define('flexible-step', FlexibleStep);
