import deletePolicyLevelExclusion from 'process/NB/ManualUnderwriting/_models/reducers/deletePolicyLevelExclusion';

describe('deletePolicyLevelExclusion', () => {
  test('delete item ', () => {
    const state = {
      businessData: {
        policyList: [
          {
            policyExclusionList: [
              {
                id: 'target-id',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: 'target-id',
      },
    };
    const result = deletePolicyLevelExclusion(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            policyExclusionList: [],
          },
        ],
      },
    });
  });
});
