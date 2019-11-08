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
        {
          name: 'Budget',
          slug: 'budget',
          fields: [
            {
              name: 'budgetId',
              state: 'editing',
              type: 'budget',
            },
          ],
        },
        {
          name: 'Review',
          slug: 'review',
          fields: [
            {
              name: 'name',
              state: 'viewing',
              type: 'text',
            },
            {
              name: 'from',
              state: 'viewing',
              type: 'datetime',
            },
            {
              name: 'thru',
              state: 'viewing',
              type: 'datetime',
            },
            {
              name: 'budgetId',
              state: 'viewing',
              type: 'budget',
            },
          ],
        },
      ],
    },
  },
};

export default engageAndAward;
