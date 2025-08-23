const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawlForTotal',
  field: 'totalAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'TotalAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 3,
        pull: 0,
        order: 15,
      },
    },
    'x-rules': ['VLD_000641'],
  },
};

export { localFieldConfig };
