import handleChangeContactInfoField from 'process/NB/ManualUnderwriting/_models/reducers/handleChangeContactInfoField';

jest.mock('process/NB/ManualUnderwriting/_models/reducers/changeBasicInfoFields', () => {
  return jest.fn((state) => {
    return state;
  });
});
jest.mock('process/NB/ManualUnderwriting/_models/reducers/saveDiffCilentInfoList', () => {
  return jest.fn((state) => state);
});

jest.mock('process/NB/ManualUnderwriting/_models/reducers/linkAddressChangeToPolicyAddress', () => {
  return jest.fn((state) => {
    return state;
  });
});

describe('handleChangeContactInfoField', () => {
  test('match currenetAddress & target addressType is exist', () => {
    const state = {
      defaultCurrentAddressType: 'C',
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
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
        changedFields: {
          currentAddress1: {
            value: 'hai zhu',
          },
        },
      },
    };

    const result = handleChangeContactInfoField(state, action);
    expect(result).toEqual({
      defaultCurrentAddressType: 'C',
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: {
                      value: 'hai zhu',
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
  test('match currenetAddress & target addrType is not exist', () => {
    const state = {
      defaultCurrentAddressType: 'R',
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
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
        changedFields: {
          currentAddress1: {
            value: 'hai zhu',
          },
        },
      },
    };
    const result = handleChangeContactInfoField(state, action);

    expect(result).toEqual({
      defaultCurrentAddressType: 'R',
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
                  },
                  {
                    addrType: 'R',
                    address1: {
                      value: 'hai zhu',
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
