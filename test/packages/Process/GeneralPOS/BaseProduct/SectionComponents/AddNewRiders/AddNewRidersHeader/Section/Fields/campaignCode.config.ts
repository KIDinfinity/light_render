const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddNewRiders-Field',
  field: 'campaignCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'PolicyLevelDecision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_UWDecision' },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
