const localFieldConfig = {
  section: 'Payable_ClaimPayable',
  field: 'refundAmount',
  'field-props': {
    visible: 'C',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'changeObjectAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
