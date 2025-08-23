import confirmAddLoadingItems from 'process/NB/ManualUnderwriting/_models/reducers/confirmAddLoadingItems';

describe('confirmAddLoadingItems', () => {
  test('test RT Type for flatMortality', () => {
    const state = {
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-code'],
        },
        name: 'client-id',
      },
      addingLoadingItems: [
        {
          id: 'foo',
          code: 'code-1',
          pmLoading: 44,
        },
        {
          id: '22',
          code: 'code-2',
          extraMortality: '55',
        },
        {
          id: '22',
          code: 'code-3',
          flatMortality: '55',
        },
      ],
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'client-id',
              },
              {
                id: 'client-id-2',
              },
            ],
            coverageList: [
              {
                payPeriod: 778,
                indemnifyPeriod: 666,
                isMain: 'Y',
                coverageLoadingList: [
                  {
                    id: 'exist-id-1',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '1',
                    clientId: 'client-id',
                  },
                ],
              },

              {
                coverageLoadingList: [
                  {
                    id: 'exist-id-2',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '2',
                    clientId: 'client-id-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      planProductConfig: {
        basicPlanProductFeatureList: [
          {
            productCode: 'product-code',
            rateTermFollowCode: 'RT',
            meTermFollowCode: 'RT',
            feTermFollowCode: 'RT',
          },
        ],
        otherPlanProductFeatureList: [],
      },
    };
    const result = confirmAddLoadingItems(state);

    expect(result).toEqual({
      addingLoadingSelectedProduct: {},
      addingLoadingItems: [],
      planProductConfig: {
        basicPlanProductFeatureList: [
          {
            productCode: 'product-code',
            rateTermFollowCode: 'RT',
            meTermFollowCode: 'RT',
            feTermFollowCode: 'RT',
          },
        ],
        otherPlanProductFeatureList: [],
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'client-id',
              },
              {
                id: 'client-id-2',
              },
            ],
            coverageList: [
              {
                payPeriod: 778,
                indemnifyPeriod: 666,
                isMain: 'Y',
                coverageLoadingList: [
                  {
                    id: 'exist-id-1',
                  },
                  {
                    id: 'foo',
                    code: 'code-1',
                    pmLoading: 44,
                    pmPeriod: 666,
                  },
                  {
                    id: '22',
                    code: 'code-2',
                    extraMortality: '55',
                    emPeriod: 666,
                  },
                  {
                    id: '22',
                    code: 'code-3',
                    flatMortality: '55',
                    fmPeriod: 666,
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '1',
                    clientId: 'client-id',
                  },
                ],
              },

              {
                coverageLoadingList: [
                  {
                    id: 'exist-id-2',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '2',
                    clientId: 'client-id-2',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  test('test PT type', () => {
    const state = {
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-code'],
        },
        name: 'client-id',
      },
      addingLoadingItems: [
        {
          id: 'foo',
          code: 'code-1',
          pmLoading: 44,
        },
        {
          id: '22',
          code: 'code-2',
          extraMortality: '55',
        },
        {
          id: '22',
          code: 'code-3',
          flatMortality: '55',
        },
      ],
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'client-id',
              },
              {
                id: 'client-id-2',
              },
            ],
            coverageList: [
              {
                payPeriod: 778,
                indemnifyPeriod: 666,
                isMain: 'Y',
                coverageLoadingList: [
                  {
                    id: 'exist-id-1',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '1',
                    clientId: 'client-id',
                  },
                ],
              },

              {
                coverageLoadingList: [
                  {
                    id: 'exist-id-2',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '2',
                    clientId: 'client-id-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      planProductConfig: {
        basicPlanProductFeatureList: [
          {
            productCode: 'product-code',
            rateTermFollowCode: 'PT',
            meTermFollowCode: 'PT',
            feTermFollowCode: 'PT',
          },
        ],
        otherPlanProductFeatureList: [],
      },
    };
    const result = confirmAddLoadingItems(state);

    expect(result).toEqual({
      addingLoadingSelectedProduct: {},
      addingLoadingItems: [],
      planProductConfig: {
        basicPlanProductFeatureList: [
          {
            productCode: 'product-code',
            rateTermFollowCode: 'PT',
            meTermFollowCode: 'PT',
            feTermFollowCode: 'PT',
          },
        ],
        otherPlanProductFeatureList: [],
      },
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'client-id',
              },
              {
                id: 'client-id-2',
              },
            ],
            coverageList: [
              {
                payPeriod: 778,
                indemnifyPeriod: 666,
                isMain: 'Y',
                coverageLoadingList: [
                  {
                    id: 'exist-id-1',
                  },
                  {
                    id: 'foo',
                    code: 'code-1',
                    pmLoading: 44,
                    pmPeriod: 778,
                  },
                  {
                    id: '22',
                    code: 'code-2',
                    extraMortality: '55',
                    emPeriod: 778,
                  },
                  {
                    id: '22',
                    code: 'code-3',
                    flatMortality: '55',
                    fmPeriod: 778,
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '1',
                    clientId: 'client-id',
                  },
                ],
              },

              {
                coverageLoadingList: [
                  {
                    id: 'exist-id-2',
                  },
                ],
                coreCode: 'product-code',
                coverageInsuredList: [
                  {
                    id: '2',
                    clientId: 'client-id-2',
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
