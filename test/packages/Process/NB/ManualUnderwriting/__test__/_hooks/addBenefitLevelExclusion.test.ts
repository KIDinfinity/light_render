import addBenefitLevelExclusion from 'process/NB/ManualUnderwriting/_models/reducers/addBenefitLevelExclusion';

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

describe('addBenefitLevelExclusion', () => {
  test('match coverage item', () => {
    const state = {
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                id: 'matchCoverageId',
                coverageExclusionList: [],
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        coverageId: 'matchCoverageId',
      },
    };
    const result = addBenefitLevelExclusion(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                id: 'matchCoverageId',
                coverageExclusionList: [
                  {
                    id: 'mock-uuid',
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
