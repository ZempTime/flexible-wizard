import { LitElement, html } from 'lit-element';

export class FlexibleWizard extends LitElement {
  static get properties() {
    return {};
  }

  render() {
    return html`
      Step!
    `;
  }
}

window.customElements.define('flexible-step', FlexibleWizard);
