import { LitElement, html } from 'lit-element';
import '@chameleon-ds/input';

// flexible-field:
//    dynamically imports relevant field
//    wires up correct communication pathway
//    provides transparent property/attribute passthrough
//

// fields:
//      -> provide all relevant variants in a specified mode
//      -> all modes: provide relevant gql fragment to compose query
//
//      -> edit:
//      -> communicate state changes with step service
//      -> provide validity fn
//      -> accept error input
//      -> participate in fieldset or form (ex: disable while loading)
//
//      -> readonly:
//      -> show readonly version
//
//      -> viewing:
//      -> show view-only mode. this is potentially a different variant of the field.

export class FlexibleField extends LitElement {
  static get properties() {
    return {
      field: { type: Object },
    };
  }

  get _field() {
    switch (this.field.type) {
      case 'text':
        return html`
          <chameleon-input name=${this.field.name} id=${this.field.id}> </chameleon-input>
        `;
      case 'budget':
        return html`
          <select>
            <option value="1">Budget 1</option>
            <option value="2">Budget 2</option>
          </select>
        `;
      case 'datetime':
        return html`
          <chameleon-input label="datetime"></chameleon-input>
        `;
      default:
        return html`
          <p>Unknown field type for ${this.field.field}</p>
        `;
    }
  }

  render() {
    return html`
      ${this._field}
    `;
  }
}

window.customElements.define('flexible-field', FlexibleField);
