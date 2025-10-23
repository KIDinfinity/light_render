import changeCrtInfoFields from 'process/NB/ManualUnderwriting/_models/reducers/changeCrtInfoFields';

jest.mock('process/NB/ManualUnderwriting/_models/reducers/saveDiffCilentInfoList', () => {
  return jest.fn((state) => state);
});

describe('test changeCrtInfoFields ', () => {
  test('test change', () => {
    const state = {
      stepsChange: {
        ClientInfo: false,
        PlanInfo: false,
        OtherInfo: false,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                crtInfoList: [
                  {
                    id: 66,
                    gender: 'L',
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
        id: 233,
        crtItemId: 66,
        changedFields: {
          gender: {
            value: 'M',
          },
        },
      },
    };
    const result = changeCrtInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
        PlanInfo: false,
        OtherInfo: false,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                crtInfoList: [
                  {
                    id: 66,
                    gender: {
                      value: 'M',
                    },
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
