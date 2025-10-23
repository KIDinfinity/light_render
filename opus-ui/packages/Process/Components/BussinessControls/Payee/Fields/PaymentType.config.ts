const localFieldConfig = {
  section: 'payee',
  field: 'paymentType',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'PaymentType',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_PaymentMode',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
