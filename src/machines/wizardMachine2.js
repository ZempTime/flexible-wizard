import { Machine, assign } from 'xstate/dist/xstate.web';

import gql from 'graphql-tag';

const budgetsQuery = gql`
  query budgetsTableQuery($first: Int!, $skip: Int!) {
    budgets(first: $first, skip: $skip) {
      name
      awardType {
        name
      }
    }
  }
`;

const audienceQuery = gql`
  query audiencesQuery($first: Int!, $skip: Int!) {
    audiences(first: $first, skip: $skip) {
      id
      name
      type
    }
  }
`;

const exampleProgramMap = {
  type: 'example',
  statuses: {
    draft: {
      transitionCriteria: 'none',
      steps: [
        {
          name: 'Description',
          slug: 'description',
          fields: [
            {
              name: 'name',
              state: 'editing',
              type: 'text',
            },
          ],
        },
      ],
    },
  },
};

const StepMachine = Machine({
  id: 'stepMachine',
  type: 'parallel',
  context: {},
  states: {
    form: {
      initial: 'idle',
      states: {
        idle: {},
        validating: {},
      },
    },
    status: {
      valid: {},
      invalid: {},
    },
  },
});

export { StepMachine };

// const initializeMap = {
//   map
//   params (slug, program type, program id)
// };

const programsQuery = ctx => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        program: {
          id: ctx.params.id,
          name: 'hey',
        },
      });
    }, 1000);
  });
};

const WizardMachine = Machine(
  {
    id: 'wizardMachine',
    context: {
      program: {},
      map: {},
      errors: [],
      steps: [],
      params: {
        slug: '',
        programType: '',
        id: '',
      },
      currentStep: '',
      pageInfo: {
        hasPrevious: false,
        hasNext: false,
      },
    },
    initial: 'initializing',
    states: {
      initializing: {
        on: {
          'WIZARD.command.initialize': {
            actions: ['initializeMap'],
            target: 'query',
          },
        },
      },
      query: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'programQuery',
              src: programsQuery,
              onError: {
                target: 'failure',
                actions: ['setErrors'],
              },
              onDone: {
                target: 'success',
                actions: ['setProgram'],
              },
            },
          },
          failure: {
            on: {
              'WIZARD.command.retryQuery': 'loading',
            },
          },
          success: {
            on: {
              '': {
                target: '#wizardMachine.step',
                actions: ['populateSteps', 'verifyCurrentStep'],
              },
            },
          },
        },
      },
      step: {
        on: {
          NEXT: () => console.log('next'),
          BACK: () => console.log('back'),
          SUBMIT: () => console.log('submit'),
        },
        initial: 'idle',
        states: {
          idle: {
            on: {
              'STEP.command.submit': 'loading',
            },
          },
          loading: {},
        },
      },
    },
  },
  {
    actions: {
      initializeMap: () => {
        console.log('initializeMap');
        //
      },
      setProgram: () => {
        console.log('setProgram');
        // set ctx.program with program data
      },
      setErrors: () => {
        console.log('setErrors');
        // set ctx.errors with any errors
      },
      populateSteps: () => {
        console.log('populateSteps');
        // add step actors
      },
      verifyCurrentStep: () => {
        console.log('verifyCurrentStep');
        // see what steps are valid
        // if requested step is valid, all good
        // ['valid', 'valid', 'invalid', 'invalid'] -> can't request step 4. should pop them to step 3
        // set step
      },
    },
  },
);

export default WizardMachine;
