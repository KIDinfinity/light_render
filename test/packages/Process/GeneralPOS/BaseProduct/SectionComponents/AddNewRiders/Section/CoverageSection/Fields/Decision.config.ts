const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddNewRiders-Coverage',
  field: 'decision',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'BenefitLevelDecision',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_UW_BenefitDecision',
    },
  },
};

export { localFieldConfig };
