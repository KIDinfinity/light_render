const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FundSwitching',
  field: 'total',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'Total',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 15,
        pull: 0,
        order: 14,
      },
    },
    'x-rules': ['VLD_000641'],
  },
};

export { localFieldConfig };
