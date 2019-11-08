import { Machine } from 'xstate/dist/xstate.web.js';

const stepMachine = Machine({
  id: 'step',
  context: {
    name: '',
    slug: '',
    fields: [],
  },
  initial: 'validating',
  states: {
    valid: {},
    validating: {},
    invalid: {},
    loading: {},
  },
});

export default stepMachine;
