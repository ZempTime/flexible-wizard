import { html, css, LitElement } from 'lit-element';
import { interpret } from 'xstate/dist/xstate.web.js';
import engageAndAward from './maps/engageaward.js';
import mapMachine from './machines/mapMachine.js';
import './components/flexible-step.js';

// Have a declared data structure
// which renders out steps
// wizard machine to maintain state of all steps
//      -> consume map
//      -> spawn machines for each step
//      -> spawn machine responsible for server communication
//      -> maintain stepper affordance
//      -> maintain button progression affordances
//      -> handle validity changes
//      -> handle server communication at appropriate times
//  step machines
//      -> declare data needs (compose a gql query)
//      -> consume fields
//      -> communicate validity, form state
//      -> provide extensible custom validation hook
//      -> render logic
//  updateMachine
//      -> loading
//      -> data
//      -> error
//      -> called (track callCount?)

export class FlexibleWizard extends LitElement {
  static get styles() {
    return css`
      :host {
        --flexible-wizard-text-color: #000;

        display: block;
        padding: 25px;
        color: var(--flexible-wizard-text-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      status: { type: String },
      transition: { type: String },
      step: { type: String },
      steps: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.service = interpret(mapMachine, { context: engageAndAward })
      .onTransition(state => {
        this.onTransition(state);
      })
      .start();

    this.service.send({ type: 'MAP.POPULATE', map: engageAndAward });
  }

  onTransition(state) {
    this.state = state;
    console.log(state);

    const { status, map, type } = state.context;

    this.title = type;
    this.status = status;

    if (state.matches('active')) {
      this.transitionCriteria = map.statuses[status].transitionCriteria;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <p>Transition: ${this.transitionCriteria}</p>
      <p>Status: ${this.status}</p>
    `;
  }
}
