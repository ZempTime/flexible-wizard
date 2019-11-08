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
//  updateMachine
//      -> loading
//      -> data
//      -> error
//      -> called (track callCount?)

const currentStep = (steps, slug) => steps.find(s => s.slug === slug);

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
      hasNextPage: { type: Boolean },
      hasPreviousPage: { type: Boolean },
      slug: { type: String },

      state: { type: Object },
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

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';

    this.service = interpret(mapMachine, { context: engageAndAward })
      .onTransition(state => {
        this.onTransition(state);
      })
      .start();

    this.service.send({ type: 'MAP.POPULATE', slug, map: engageAndAward });
  }

  onTransition(state) {
    this.state = state;
    console.log(state);

    const { status, map, type, slug } = state.context;

    this.title = type;
    this.status = status;

    // TODO: probably be good to implement "selectors" or "lenses" in separate functions and replace this.
    if (state.matches('active')) {
      const currentStatus = map.statuses[status];
      this.transitionCriteria = currentStatus.transitionCriteria;

      this.slug = slug;
      this.steps = currentStatus.steps;
      this.currentStep = currentStep(currentStatus.steps, slug);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  render() {
    const globalDetails = html`
      <h2>${this.title}</h2>
      <p>Transition: ${this.transitionCriteria}</p>
      <p>Status: ${this.status}</p>
    `;

    const steppers = html`
      ${this.steps.map(
        step =>
          html`
            ${step.slug}
          `,
      )}
    `;

    if (this.service.state.matches('active')) {
      return html`
        ${globalDetails} ${steppers}
        <p>Slug: ${this.slug}</p>
        <div>
          <flexible-step .step=${this.currentStep}></flexible-step>
        </div>
      `;
    }

    return html``;
  }
}
