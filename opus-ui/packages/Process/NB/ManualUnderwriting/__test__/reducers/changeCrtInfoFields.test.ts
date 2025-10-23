import changeCrtInfoFields from 'process/NB/ManualUnderwriting/_models/reducers/changeCrtInfoFields';

jest.mock('process/NB/ManualUnderwriting/_models/reducers/saveDiffCilentInfoList', () => {
  return jest.fn((state) => state);
});

describe('changeCrtInfoFields', () => {
  test('change field', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                crtInfoList: [
                  {
                    id: 'crtItemId',
                    ctfPlace: 'USA',
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
        id: 'clientId',
        crtItemId: 'crtItemId',
        changedFields: {
          ctfPlace: {
            value: 'china',
          },
        },
      },
    };
    const result = changeCrtInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                crtInfoList: [
                  {
                    id: 'crtItemId',
                    ctfPlace: {
                      value: 'china',
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
