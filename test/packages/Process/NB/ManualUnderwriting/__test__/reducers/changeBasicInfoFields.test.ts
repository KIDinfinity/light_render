import changeBasicInfoFields from 'process/NB/ManualUnderwriting/_models/reducers/changeBasicInfoFields';
//
jest.mock('process/NB/ManualUnderwriting/_hooks/data.trans.config', () => {
  return {
    transConfigs: [
      {
        zipCode: 'addressList.[0].zipCode',
        businessAddress1: {
          baseSource: 'addressList',
          dataSoureType: 'array',
          matchRule: {
            paramKey: 'addrType',
            paramValue: 'B',
          },
          targetParam: 'address1',
        },
        identityType: {
          baseSource: 'crtInfoList',
          dataSoureType: 'array',
          matchRule: {
            paramKey: 'type',
            paramValue: 'P',
          },
          targetParam: 'ctfType',
          mapchange: false,
        },
        noTin: {
          baseSource: 'crtInfoList',
          dataSoureType: 'array',
          matchRule: [
            {
              paramKey: 'ctfPlace',
              paramValue: ['USA'],
              operator: 'includes',
            },
            {
              paramKey: 'ctfType',
              paramValue: ['TN'],
              operator: 'includes',
            },
            {
              paramKey: 'type',
              paramValue: ['S'],
              operator: 'includes',
            },
          ],
          targetParam: 'noTin',
        },
        noTinNotMatch: {
          baseSource: 'crtInfoList',
          dataSoureType: 'array',
          matchRule: [
            {
              paramKey: 'ctfPlace',
              paramValue: ['USA'],
              operator: 'includes',
            },
            {
              paramKey: 'ctfType',
              paramValue: ['TN'],
              operator: 'includes',
            },
            {
              paramKey: 'type',
              paramValue: ['P'],
              operator: 'includes',
            },
          ],
          targetParam: 'noTinNotMatch',
        },
      },
    ],
    extraDataSrouce: {
      purposeOfInsurance: 'purposeOfInsurance',
    },
  };
});
jest.mock('uuid', () => {
  return {
    v4: () => '233',
  };
});
jest.mock('process/NB/ManualUnderwriting/_models/reducers/saveDiffCilentInfoList', () => {
  return jest.fn((state) => state);
});
describe('test changeBasicInfoFields ', () => {
  test('test change', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                gender: 'L',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: 233,
        changedFields: {
          gender: {
            value: 'M',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                gender: {
                  value: 'M',
                },
              },
            ],
          },
        ],
      },
    });
  });
  test('transConfigFiels', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    zipCode: '233',
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
        changedFields: {
          zipCode: {
            value: '666',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    zipCode: {
                      value: '666',
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
  test('extraDataSrouce', () => {
    const state = {
      businessData: {
        purposeOfInsurance: '233',
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: 233,
        changedFields: {
          purposeOfInsurance: {
            value: '666',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        purposeOfInsurance: {
          value: '666',
        },
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
              },
            ],
          },
        ],
      },
    });
  });
  test('change fields with match rule', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    address1: '233',
                    addrType: 'B',
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
        changedFields: {
          businessAddress1: {
            value: '666',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    address1: {
                      value: '666',
                    },
                    addrType: 'B',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
  test('condition match', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                crtInfoList: [
                  {
                    type: 'CC',
                  },
                ],
                identityType: 'before',
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
          identityType: 'changed',
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
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
                    type: 'CC',
                  },
                ],
                identityType: 'changed',
              },
            ],
          },
        ],
      },
    });
  });
  test('match mutiple rule data is not exit', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'clientId',
                crtInfoList: [
                  {
                    ctfPlace: 'USA',
                    ctfType: 'TN',
                    type: 'S',
                    noTinNotMatch: '66',
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
          noTinNotMatch: 'changed',
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
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
                    ctfPlace: 'USA',
                    ctfType: 'TN',
                    type: 'S',
                    noTinNotMatch: '66',
                  },
                  {
                    ctfPlace: 'USA',
                    ctfType: 'TN',
                    type: 'P',
                    noTinNotMatch: 'changed',
                    id: '233',
                  },
                ],
                noTinNotMatch: 'changed',
              },
            ],
          },
        ],
      },
    });
  });
  test('change fields with match rule operator', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                crtInfoList: [
                  {
                    ctfPlace: 'PHL',
                    ctfType: 'ID',
                    type: 'P',
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
        changedFields: {
          tinsssgsis: {
            value: 'GS',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);
    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                crtInfoList: [
                  {
                    ctfPlace: 'PHL',
                    ctfType: 'ID',
                    type: 'P',
                  },
                ],
                tinsssgsis: {
                  value: 'GS',
                },
              },
            ],
          },
        ],
      },
    });
  });

  test('change fields with match rule if target data not exist', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [],
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: 233,
        changedFields: {
          businessAddress1: {
            value: '666',
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);

    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    address1: {
                      value: '666',
                    },
                    addrType: 'B',
                    id: '233',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  test('change fields with match rule if target data not exist && set validate error', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [],
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: 233,
        changedFields: {
          businessAddress1: {
            value: '',
            errors: ['required'],
          },
        },
      },
    };
    const result = changeBasicInfoFields(state, action);

    expect(result).toEqual({
      stepsChange: {
        ClientInfo: true,
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 233,
                addressList: [
                  {
                    address1: {
                      errors: ['required'],
                      value: '',
                    },
                    addrType: 'B',
                    id: '233',
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
