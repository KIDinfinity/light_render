import setPolicyReplacementField from 'process/NB/ManualUnderwriting/_models/reducers/setPolicyReplacementField';

describe('setPolicyReplacementField', () => {
  test('setPolicyReplacementField', () => {
    const state = {
      businessData: {
        policyList: [
          {
            replacementInfoList: [
              {
                comment: '',
              },
              {
                comment: '666',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields: {
          comment: 'Test',
        },
      },
    };
    const result = setPolicyReplacementField(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            replacementInfoList: [
              {
                comment: 'Test',
              },
              {
                comment: 'Test',
              },
            ],
          },
        ],
      },
    });
  });
});
