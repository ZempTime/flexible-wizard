const engageAndAward = {
  type: 'EngageAndAward',
  statuses: {
    draft: {
      transitionCriteria: 'Advances to scheduled when you hit SUBMIT on final step',
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
            {
              name: 'from',
              state: 'editing',
              type: 'datetime',
            },
            {
              name: 'thru',
              state: 'editing',
              type: 'datetime',
            },
          ],
        },
      ],
    },
  },
};

export default engageAndAward;
