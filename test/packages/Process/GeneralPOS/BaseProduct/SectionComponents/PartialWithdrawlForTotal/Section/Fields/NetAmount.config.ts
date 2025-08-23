const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawlForTotal',
  field: 'netAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'NetAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
      // 576px
      sm: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 15,
        pull: 0,
        order: 17,
      },
    },
    'x-rules': ['VLD_000641'],
  },
};

export { localFieldConfig };
