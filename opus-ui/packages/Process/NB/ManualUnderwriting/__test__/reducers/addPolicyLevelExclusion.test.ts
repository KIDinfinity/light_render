import addPolicyLevelExclusion from 'process/NB/ManualUnderwriting/_models/reducers/addPolicyLevelExclusion';

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

describe('addPolicyLevelExclusion', () => {
  test('addPolicyLevelExclusion item', () => {
    const state = {
      businessData: {
        policyList: [
          {
            policyExclusionList: [
              {
                id: 'exist-id',
              },
            ],
          },
        ],
      },
    };
    const action = {};
    const result = addPolicyLevelExclusion(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            policyExclusionList: [
              {
                id: 'exist-id',
              },
              {
                id: 'mock-uuid',
              },
            ],
          },
        ],
      },
    });
  });
});
