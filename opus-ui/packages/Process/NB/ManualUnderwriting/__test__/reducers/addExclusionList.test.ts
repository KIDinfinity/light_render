import addExclusionList from 'process/NB/ManualUnderwriting/_models/reducers/addExclusionList';

describe('addExclusionList', () => {
  test('add policyExclusionList', () => {
    const state = {
      productSection: {
        productName: 'All',
      },
      businessData: {
        policyList: [
          {
            id: 'policy-1',
            policyExclusionList: [
              {
                code: 'ppp',
                longDescription: '',
                shortName: '',
              },
            ],
            coverageList: [
              {
                id: 'coverage-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                ],
              },
              {
                id: 'coverage-2',
                coverageExclusionList: [
                  {
                    code: 'ddd',
                    longDescription: '',
                    shortName: '',
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
        addPopExclusionList: [
          {
            code: 'fff',
            longDescription: '',
            shortName: '',
          },
        ],
      },
    };

    const result = addExclusionList(state, action);

    expect(result).toEqual({
      productSection: {
        productName: 'All',
      },
      businessData: {
        policyList: [
          {
            id: 'policy-1',
            policyExclusionList: [
              {
                code: 'ppp',
                longDescription: '',
                shortName: '',
              },
              {
                code: 'fff',
                longDescription: '',
                shortName: '',
              },
            ],
            coverageList: [
              {
                id: 'coverage-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                ],
              },
              {
                id: 'coverage-2',
                coverageExclusionList: [
                  {
                    code: 'ddd',
                    longDescription: '',
                    shortName: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  test('add coverage exclusion', () => {
    const state = {
      productSection: {
        productName: 'coreCode-1',
        name: 'client-3',
      },
      businessData: {
        policyList: [
          {
            id: 'policy-1',
            policyExclusionList: [
              {
                code: 'ppp',
                longDescription: '',
                shortName: '',
              },
            ],
            coverageList: [
              {
                id: 'coverage-1',
                coreCode: 'coreCode-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                ],
                coverageInsuredList: [
                  {
                    id: 'id-1',
                    clientId: 'clientId-1',
                  },
                ],
              },
              {
                id: 'coverage-3',
                coreCode: 'coreCode-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                ],
                coverageInsuredList: [
                  {
                    id: 'id-3',
                    clientId: 'client-3',
                  },
                ],
              },
              {
                id: 'coverage-2',
                coreCode: 'coreCode-2',
                coverageExclusionList: [
                  {
                    code: 'ddd',
                    longDescription: '',
                    shortName: '',
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
        addPopExclusionList: [
          {
            code: 'fff',
            longDescription: '',
            shortName: '',
          },
        ],
      },
    };

    const result = addExclusionList(state, action);

    expect(result).toEqual({
      productSection: {
        productName: 'coreCode-1',
        name: 'client-3',
      },
      businessData: {
        policyList: [
          {
            id: 'policy-1',
            policyExclusionList: [
              {
                code: 'ppp',
                longDescription: '',
                shortName: '',
              },
            ],
            coverageList: [
              {
                id: 'coverage-1',
                coreCode: 'coreCode-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                ],
                coverageInsuredList: [
                  {
                    id: 'id-1',
                    clientId: 'clientId-1',
                  },
                ],
              },
              {
                id: 'coverage-3',
                coreCode: 'coreCode-1',
                coverageExclusionList: [
                  {
                    code: 'ccc',
                    longDescription: '',
                    shortName: '',
                  },
                  {
                    code: 'fff',
                    longDescription: '',
                    shortName: '',
                  },
                ],
                coverageInsuredList: [
                  {
                    id: 'id-3',
                    clientId: 'client-3',
                  },
                ],
              },
              {
                id: 'coverage-2',
                coreCode: 'coreCode-2',
                coverageExclusionList: [
                  {
                    code: 'ddd',
                    longDescription: '',
                    shortName: '',
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
