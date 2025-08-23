const localFieldConfig = {
  section: 'ServiceItemPayable',
  field: 'exchangeRateInvoicePolicy',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ExchangeRateInvoiceToPolicy',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
