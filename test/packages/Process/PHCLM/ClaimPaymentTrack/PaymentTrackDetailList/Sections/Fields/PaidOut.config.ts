const localFieldConfig = {
  section: 'paymentTrackDetail',
  field: 'paidOut',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PaidOut',
    },
    'x-dict': {
      dictTypeCode: 'boolean',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
