const localFieldConfig = {
  section: 'payee',
  field: 'bankName',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BankName',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };
