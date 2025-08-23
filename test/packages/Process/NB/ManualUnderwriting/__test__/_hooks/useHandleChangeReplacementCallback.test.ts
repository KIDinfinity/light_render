import { renderHook } from '@testing-library/react-hooks';
import useHandleChangeReplacementCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeReplacementCallback';

jest.mock('basic/components/Elements/hooks/useGetSectionAtomConfig', () => {
  return jest.fn(() => {
    return [
      {
        caseCategory: 'BP_NB_CTG001',
        activityCode: 'BP_NB_ACT004',
        section: 'PolicyReplacement-Field',
        field: 'replaceInforce',
        fieldType: 'Dropdown',
        regionCode: 'MY',
        magnification: null,
        'field-props': {
          visible: 'Y',
          editable: 'Y',
          required: 'Y',
          expand: 'N',
          maxLength: null,
          label: {
            dictTypeCode: 'Label_BIZ_Individual',
            dictCode: 'ReplaceInforce',
            type: null,
          },
          layouts: [
            {
              layoutName: 'x-layout',
              layout: {
                xs: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
                sm: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
                md: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
                lg: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
                xl: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
                xxl: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 1,
                },
              },
            },
          ],
          'editable-condition': null,
          'visible-condition': null,
          'required-condition': null,
          'x-rules': null,
          'x-layout': {
            xs: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
            sm: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
            md: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
            lg: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
            xl: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
            xxl: {
              span: 24,
              offset: null,
              pull: null,
              order: 1,
            },
          },
          'x-dict': {
            dictTypeCode: 'Dropdown_COM_YN',
          },
        },
      },
      {
        caseCategory: 'BP_NB_CTG001',
        activityCode: 'BP_NB_ACT004',
        section: 'PolicyReplacement-Field',
        field: 'paidByPolicyLoan',
        fieldType: 'Dropdown',
        regionCode: 'MY',
        magnification: null,
        'field-props': {
          visible: 'N',
          editable: 'Y',
          required: 'Y',
          expand: 'N',
          maxLength: null,
          label: {
            dictTypeCode: 'Label_BIZ_Individual',
            dictCode: 'PaidByPolicyLoan',
            type: null,
          },
          layouts: [
            {
              layoutName: 'x-layout',
              layout: {
                xs: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                sm: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                md: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                lg: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                xl: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                xxl: {
                  span: 24,
                  offset: null,
                  pull: null,
                  order: 2,
                },
              },
            },
          ],
          'editable-condition': null,
          'visible-condition': null,
          'required-condition': null,
          'x-rules': null,
          'x-layout': {
            xs: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
            sm: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
            md: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
            lg: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
            xl: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
            xxl: {
              span: 24,
              offset: null,
              pull: null,
              order: 2,
            },
          },
          'x-dict': {
            dictTypeCode: 'Dropdown_COM_YesNo',
          },
        },
      },
    ];
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetReplacementFieldInfo', () => {
  return jest
    .fn(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return {
        replaceInforce: 'Y',
        paidByPolicyLoan: 'N',
        policyReplacementFlag: 'Y',
      };
    })
    .mockImplementationOnce(() => {
      return {
        replaceInforce: 'N',
        paidByPolicyLoan: 'N',
        policyReplacementFlag: 'Y',
      };
    });
});

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      cleanValidateData: (value: any) => value,
    },
  };
});

let params = {};

jest.mock('dva', () => {
  return {
    useDispatch: () => {
      return jest.fn((p: any) => {
        params = p;
      });
    },
  };
});

describe('useHandleChangeReplacementCallback', () => {
  beforeEach(() => {
    params = {};
  });
  test('handle change replaceInforce && all value N', () => {
    const renderer = renderHook(() => useHandleChangeReplacementCallback());

    const handler = renderer.result.current;

    handler({
      name: 'replaceInforce',
      value: 'N',
    });

    expect(params).toEqual({
      type: 'manualUnderwriting/setPolicyReplacementData',
      payload: {
        changedFields: {
          policyReplacementFlag: 'N',
        },
      },
    });
  });

  test('handlechange paidByPolicyLoan & some field has Y', () => {
    const renderer = renderHook(() => useHandleChangeReplacementCallback());

    const handler = renderer.result.current;

    handler({
      name: 'replaceInforce',
      value: 'Y',
    });

    expect(params).toEqual({
      type: 'manualUnderwriting/setPolicyReplacementData',
      payload: {
        changedFields: {
          policyReplacementFlag: 'Y',
        },
      },
    });
  });
});
