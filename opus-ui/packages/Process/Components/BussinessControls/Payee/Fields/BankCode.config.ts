const localFieldConfig = {
  section: 'payee',
  field: 'bankCode',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BankCode',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };
