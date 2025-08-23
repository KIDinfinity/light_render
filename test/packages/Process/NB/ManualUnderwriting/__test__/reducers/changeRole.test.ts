import changeRole from 'process/NB/ManualUnderwriting/_models/reducers/changeRole';

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: (object: any) => {
        return object.value;
      },
    },
  };
});
describe('changeRole', () => {
  it('changefields', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                roleList: [
                  {
                    customerRole: 'Owner',
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
        clientId: '233',
        changedFields: {
          customerRole: {
            value: ['Owner', 'Payor'],
          },
        },
      },
    };
    const result = changeRole(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                roleList: [
                  {
                    customerRole: 'Owner',
                    deleted: 0,
                  },
                  {
                    customerRole: 'Payor',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
  it('change customer type by certain role', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                customerType: 'C',
                roleList: [
                  {
                    customerRole: 'CUS002',
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
        clientId: '233',
        changedFields: {
          customerRole: {
            value: ['CUS001', 'CUS003'],
          },
        },
      },
    };
    const result = changeRole(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                customerType: 'P',
                roleList: [
                  {
                    customerRole: 'CUS002',
                    deleted: 1,
                  },
                  {
                    customerRole: 'CUS001',
                  },
                  {
                    customerRole: 'CUS003',
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
