const localFieldConfig = {
  section: 'payee',
  field: 'passbookCode',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'PostbankID',
    },
    maxLength: 5,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
  },
};

export { localFieldConfig };
