const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawal',
  field: 'requestTotalAmount',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'RequestTotalAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 736px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': ['VLD_000914'],
  },
};

export { localFieldConfig };
