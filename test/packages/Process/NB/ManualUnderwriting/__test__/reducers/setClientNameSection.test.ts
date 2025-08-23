import setClientNameSection from 'process/NB/ManualUnderwriting/_models/reducers/setClientNameSection';

describe('setClientNameSection', () => {
  test('change value', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'coverage-insured',
                customerSeqNo: '666',
              },
              {
                id: 'coverage-insured-02',
                customerSeqNo: '222',
              },
            ],
            coverageList: [
              {
                id: 'coverage-id',
                coverageInsuredList: [
                  {
                    id: 'coverage-insured',
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
        insuredId: 'coverage-insured',
        coverageId: 'coverage-id',
        changedFields: {
          clientId: 'coverage-insured-02',
        },
      },
    };
    const result = setClientNameSection(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'coverage-insured',
                customerSeqNo: '666',
              },
              {
                id: 'coverage-insured-02',
                customerSeqNo: '222',
              },
            ],
            coverageList: [
              {
                id: 'coverage-id',
                coverageInsuredList: [
                  {
                    id: 'coverage-insured',
                    clientId: 'coverage-insured-02',
                    insuredSeqNum: '222',
                    coreCode: undefined,
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
