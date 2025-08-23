const localFieldConfig = {
  section: 'payee',
  field: 'passbookNo',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'PostbankNo',
    },
    maxLength: 8,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
    },
  },
};

export { localFieldConfig };
