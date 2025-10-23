const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyLoan',
  field: 'loanAllowPerc',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: '%ofLoanAllowable',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
