import { Machine } from 'xstate/es';

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
