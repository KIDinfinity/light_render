const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Refund',
  field: 'refundAmount',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'RefundAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
       span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
       span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
       span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
       span: 4,
        offset: 2,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': ['VLD_001401'],
  },
};

export { localFieldConfig };
