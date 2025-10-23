import clearTargetCoverageLoading from 'process/NB/ManualUnderwriting/_models/reducers/clearTargetCoverageLoading';

describe('clearTargetCoverageLoading', () => {
  test('test clear target', () => {
    const state = {
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                id: 'target',
                coverageLoadingList: [
                  {
                    id: 'loading-1',
                  },
                ],
              },
              {
                id: 'not-target',
                coverageLoadingList: [
                  {
                    id: 'loading-2',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        coverageId: 'target',
      },
    };
    const result = clearTargetCoverageLoading(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                id: 'target',
                coverageLoadingList: [],
              },
              {
                id: 'not-target',
                coverageLoadingList: [
                  {
                    id: 'loading-2',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
});
