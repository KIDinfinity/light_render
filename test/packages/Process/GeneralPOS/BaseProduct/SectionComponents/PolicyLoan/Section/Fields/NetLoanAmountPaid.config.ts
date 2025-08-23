const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyLoan',
  field: 'netLoanAmtPaid',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'NetLoanAmountPaid',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
