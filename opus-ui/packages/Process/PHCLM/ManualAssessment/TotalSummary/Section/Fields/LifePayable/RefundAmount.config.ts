const localFieldConfig = {
  section: 'SummaryPayable.LifePayable',
  field: 'refundAmount',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'RefundAmt',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };
