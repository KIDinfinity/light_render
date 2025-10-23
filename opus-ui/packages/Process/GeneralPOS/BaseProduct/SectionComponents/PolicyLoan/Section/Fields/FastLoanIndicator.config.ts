const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyLoan',
  field: 'fastLoanInd',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'FastLoanIndicator',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
