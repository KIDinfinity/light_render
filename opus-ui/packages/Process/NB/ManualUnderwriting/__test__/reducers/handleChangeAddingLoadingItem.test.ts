import handleChangeAddingLoadingItem from 'process/NB/ManualUnderwriting/_models/reducers/handleChangeAddingLoadingItem';

describe('handleChangeAddingLoadingItem', () => {
  test('change field', () => {
    const state = {
      addingLoadingItems: [
        {
          id: 'target',
          productName: '',
        },
      ],
    };
    const action = {
      payload: {
        id: 'target',
        changedFields: {
          productName: 'new',
        },
      },
    };
    const result = handleChangeAddingLoadingItem(state, action);
    expect(result).toEqual({
      addingLoadingItems: [
        {
          id: 'target',
          productName: 'new',
        },
      ],
    });
  });
  test('change pmLoading & has payPeriod', () => {
    const state = {
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-1'],
        },
        name: 'insured-2',
      },
      addingLoadingItems: [
        {
          id: 'target',
          pmLoading: '',
          emPeriod: 6,
          extraMortality: 'xxx',
        },
      ],
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                productCode: 'product-1',
                payPeriod: '8',
                coverageInsuredList: [
                  {
                    clientId: 'insured-1',
                  },
                ],
              },
              {
                productCode: 'product-1',
                payPeriod: '5',
                coverageInsuredList: [
                  {
                    clientId: 'insured-2',
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
        id: 'target',
        changedFields: {
          pmLoading: 'changed',
        },
      },
    };
    const result = handleChangeAddingLoadingItem(state, action);
    expect(result).toEqual({
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-1'],
        },
        name: 'insured-2',
      },
      addingLoadingItems: [
        {
          id: 'target',
          pmLoading: 'changed',
          emPeriod: null,
          extraMortality: null,
          pmPeriod: null,
          flatMortality: null,
          fmPeriod: null,
        },
      ],
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                productCode: 'product-1',
                payPeriod: '8',
                coverageInsuredList: [
                  {
                    clientId: 'insured-1',
                  },
                ],
              },
              {
                productCode: 'product-1',
                payPeriod: '5',
                coverageInsuredList: [
                  {
                    clientId: 'insured-2',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
  test('change extraMortality & has payPeriod', () => {
    const state = {
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-1'],
        },
        name: 'insured-2',
      },
      addingLoadingItems: [
        {
          id: 'target',
          pmLoading: 'xx',
          pmPeriod: 5,
          emPeriod: null,
          extraMortality: '',
        },
      ],
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                productCode: 'product-1',
                payPeriod: '6',
                coverageInsuredList: [
                  {
                    clientId: 'insured-1',
                  },
                ],
              },
              {
                productCode: 'product-1',
                payPeriod: '5',
                coverageInsuredList: [
                  {
                    clientId: 'insured-2',
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
        id: 'target',
        changedFields: {
          extraMortality: 'changed',
        },
      },
    };
    const result = handleChangeAddingLoadingItem(state, action);
    expect(result).toEqual({
      addingLoadingSelectedProduct: {
        productName: {
          value: ['product-1'],
        },
        name: 'insured-2',
      },
      addingLoadingItems: [
        {
          id: 'target',
          pmLoading: null,
          emPeriod: null,
          extraMortality: 'changed',
          pmPeriod: null,
          flatMortality: null,
          fmPeriod: null,
        },
      ],
      businessData: {
        policyList: [
          {
            coverageList: [
              {
                productCode: 'product-1',
                payPeriod: '6',
                coverageInsuredList: [
                  {
                    clientId: 'insured-1',
                  },
                ],
              },
              {
                productCode: 'product-1',
                payPeriod: '5',
                coverageInsuredList: [
                  {
                    clientId: 'insured-2',
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
