import markHasLoadingCoverage from 'process/NB/ManualUnderwriting/_models/reducers/markHasLoadingCoverage';

describe('markHasLoadingCoverage', () => {
  test('mark non-standard coverage has loading', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            coverageList: [
              {
                id: 'main-coverage',
                coverageDecision: {
                  uwDecision: 'NS',
                },
              },
              {
                id: 'rider',
                coverageDecision: {
                  uwDecision: 'S',
                },
              },
            ],
          },
        ],
      },
    };

    const result = markHasLoadingCoverage(state);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            coverageList: [
              {
                id: 'main-coverage',
                coverageDecision: {
                  uwDecision: 'NS',
                },
                hasLoading: 'Y',
              },
              {
                id: 'rider',
                coverageDecision: {
                  uwDecision: 'S',
                },
                hasLoading: 'Y',
              },
            ],
          },
        ],
      },
    });
  });
});
