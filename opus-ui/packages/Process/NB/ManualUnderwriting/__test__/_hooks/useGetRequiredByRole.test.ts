import { renderHook } from '@testing-library/react-hooks';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetRegionalDefaultValue', () => {
  return jest
    .fn(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return '';
    })
    .mockImplementationOnce(() => {
      return 'CUS010';
    })
    .mockImplementationOnce(() => {
      return '';
    });
});
jest.mock('basic/hooks/useGetRequriedByConfig', () => {
  return jest
    .fn(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return true;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return true;
    })
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return false;
    });
});

jest.mock('process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return ['CUS001'];
    })

    .mockImplementationOnce(() => {
      return ['CUS002'];
    })

    .mockImplementationOnce(() => {
      return ['CUS001'];
    })
    .mockImplementationOnce(() => {
      return ['CUS002'];
    })
    .mockImplementationOnce(() => {
      return ['CUS002'];
    })
    .mockImplementationOnce(() => {
      return ['CUS005'];
    })
    .mockImplementationOnce(() => {
      return ['CUS005', 'CUS010'];
    })
    .mockImplementationOnce(() => {
      return [];
    });
});

describe('useGetRequiredByRole', () => {
  test('match requried role, required is C', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              conditions: [
                {
                  left: { domain: 'field', field: 'customerRole' },
                  operator: 'in',
                  right: ['CUS001'],
                },
              ],
              combine: '&&',
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });

  test('not match requried role, required is C', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              conditions: [
                {
                  left: { domain: 'field', field: 'customerRole' },
                  operator: 'in',
                  right: ['CUS001'],
                },
              ],
              combine: '&&',
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('match requried role, required is N', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'N',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              conditions: [
                {
                  left: { domain: 'field', field: 'customerRole' },
                  operator: 'in',
                  right: ['CUS001'],
                },
              ],
              combine: '&&',
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('not match requried role, required is Y , useGetRequriedByConfig return true', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'Y',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              conditions: [
                {
                  left: { domain: 'field', field: 'customerRole' },
                  operator: 'in',
                  right: ['CUS001'],
                },
              ],
              combine: '&&',
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });

  /*

  {
  combine: '&&',
  conditions: [
    {
      left: {
        domain: 'field',
        field: 'customerRole'
      },
      operator: 'in',
      right: [
        'CUS005'
      ]
    },
    {
      left: {
        domain: 'field',
        field: 'customerRole'
      },
      operator: 'not in',
      right: [
        'CUS002'
      ]
    }
  ]
}
  */
  test('combine rule role is CUS002', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              combine: '&&',
              conditions: [
                {
                  left: {
                    domain: 'field',
                    field: 'customerRole',
                  },
                  operator: 'in',
                  right: ['CUS005'],
                },
                {
                  left: {
                    domain: 'field',
                    field: 'customerRole',
                  },
                  operator: 'not in',
                  right: ['CUS002'],
                },
              ],
            },
          },
        },
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('combine rule role is CUS005', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              combine: '&&',
              conditions: [
                {
                  left: {
                    domain: 'field',
                    field: 'customerRole',
                  },
                  operator: 'in',
                  right: ['CUS005'],
                },
                {
                  left: {
                    domain: 'field',
                    field: 'customerRole',
                  },
                  operator: 'not in',
                  right: ['CUS002'],
                },
              ],
            },
          },
        },
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });

  test('match requried role, required is C', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              conditions: [
                {
                  left: { domain: 'field', field: 'customerRole' },
                  operator: 'in',
                  right: ['CUS005'],
                },
              ],
              combine: '&&',
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('other required condition, required is C, combine is &', () => {
    const renderer = renderHook(() => {
      return useGetRequiredByRole({
        requiredConditions: true,
        localConfig: {},
        config: {
          caseCategory: 'BP_NB_CTG001',
          activityCode: 'BP_NB_ACT004',
          section: 'DistributionChannel-Field',
          field: 'agentRelated',
          fieldType: 'Dropdown',
          regionCode: 'TH',
          magnification: null,
          changeOperation: null,
          changeParam: null,
          changeResultLimitMin: null,
          'field-props': {
            visible: 'Y',
            editable: 'Y',
            required: 'C',
            expand: 'Y',
            maxLength: null,
            label: {
              dictTypeCode: 'Label_BIZ_Policy',
              dictCode: 'AgentRelated',
              type: null,
            },
            layouts: [],
            'editable-condition': null,
            'visible-condition': null,
            'required-condition': {
              combine: '&&',
              conditions: [
                {
                  left: { domain: 'field', field: 'ctfCountryCode' },
                  operator: 'not empty',
                },
                {
                  left: { domain: 'field', field: 'reason' },
                  operator: 'empty',
                },
              ],
            },
            'x-rules': null,
            'x-layout': {},
            'x-dict': {
              dictTypeCode: 'Dropdown_COM_YN',
            },
          },
        },
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
