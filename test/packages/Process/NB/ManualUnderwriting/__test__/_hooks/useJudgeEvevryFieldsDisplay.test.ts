import { renderHook } from '@testing-library/react-hooks';
import useJudgeEvevryFieldsDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';

jest.mock('process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions', () => {
  return jest.fn(({ fieldConfig }: any) => {
    return fieldConfig;
  });
});

jest.mock('process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions', () => {
  return jest.fn(({ fieldConfig }: any) => {
    return fieldConfig;
  });
});

jest.mock('process/NB/ManualUnderwriting/basicClientSections.config', () => {
  return ['PersonalInfo-Field'];
});

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            pageAtomConfig: [
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },
                  layouts: [
                    {
                      layoutName: 'x-layout',
                      layout: {
                        xs: {
                          span: 4,
                          offset: null,
                          pull: null,
                          order: 2,
                        },
                        sm: {
                          span: 4,
                          offset: null,
                          pull: null,
                          order: 2,
                        },
                        md: {
                          span: 4,
                          offset: null,
                          pull: null,
                          order: 2,
                        },
                        lg: {
                          span: 4,
                          offset: null,
                          pull: null,
                          order: 2,
                        },
                        xl: {
                          span: 4,
                          offset: null,
                          pull: null,
                          order: 2,
                        },
                        xxl: {
                          span: 4,
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
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                    sm: {
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                    md: {
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                    lg: {
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                    xl: {
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                    xxl: {
                      span: 4,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
            ],
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            pageAtomConfig: [
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },

              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
              {
                caseCategory: 'BP_NB_CTG001',
                activityCode: 'BP_NB_ACT004',
                section: 'PersonalInfo-Field',
                field: 'taxId',
                fieldType: 'Text',
                regionCode: 'KH',
                'field-props': {
                  visible: 'Y',
                  editable: 'N',
                  required: null,
                  expand: 'N',
                  maxLength: null,
                  label: {
                    dictTypeCode: 'Label_BIZ_Individual',
                    dictCode: 'TINNo',
                    type: null,
                  },

                  'editable-condition': null,
                  'visible-condition': null,
                  'required-condition': null,
                  'x-rules': null,
                  'x-layout': {
                    lg: {
                      span: 24,
                      offset: null,
                      pull: null,
                      order: 2,
                    },
                  },
                  'x-dict': {
                    dictTypeCode: null,
                  },
                },
              },
            ],
          },
        };
      }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest.fn(() => {
    return [
      {
        id: '233',
        roleList: [],
        customerType: 'P',
      },
    ];
  });
});

jest.mock('basic/hooks/useGetFieldsCustomerTypeConfig', () => {
  return jest.fn(() => {
    return [];
  });
});
jest.mock('process/NB/ManualUnderwriting/utils/calcLinesWithFieldsConfig', () => {
  return jest
    .fn(() => {
      return 1;
    })
    .mockImplementationOnce(() => {
      return 6;
    })
    .mockImplementationOnce(() => {
      return 8;
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig', () => {
  return jest.fn(() => {
    return [];
  });
});
jest.mock('basic/components/CaseContainer/hooks/useGetCaseDetail', () => {
  return jest.fn(() => {
    return {
      caseCategory: 'BP_NB_CTG001',
    };
  });
});
describe('useJudgeEvevryFieldsDisplay', () => {
  test('lines < 7', () => {
    const renderer = renderHook(() =>
      useJudgeEvevryFieldsDisplay({
        id: '233',
        expand: 'true',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('lines > 7', () => {
    const renderer = renderHook(() =>
      useJudgeEvevryFieldsDisplay({
        id: '233',
        expand: 'true',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
