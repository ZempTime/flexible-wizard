import { Machine, assign, spawn } from 'xstate/dist/xstate.web.js';
import stepMachine from './stepMachine.js';

const mapMachine = Machine({
  id: 'map',
  context: {
    status: 'draft',
    map: null,
    steps: [],
    step: '',
  },
  initial: 'dormant',
  states: {
    dormant: {
      on: {
        'MAP.POPULATE': {
          actions: assign({
            map: (_ctx, e) => e.map,
          }),
          target: 'initializing',
        },
      },
    },
    initializing: {
      entry: assign({
        steps: ctx => {
          const currentStatus = ctx.map.statuses[ctx.status];
          const { steps } = currentStatus;

          return steps.map(step => ({
            ref: spawn(stepMachine.withContext(step)),
          }));
        },
      }),
      on: {
        '': 'active',
      },
    },
    active: {},
    errored: {},
  },
});

export default mapMachine;
