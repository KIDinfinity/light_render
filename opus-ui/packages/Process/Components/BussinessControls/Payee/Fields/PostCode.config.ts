const localFieldConfig = {
  section: 'payee',
  field: 'postCode',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ZipCode',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 576px
      sm: {
        span: 4,
        offset: 8,
        pull: 8,
        order: 22,
      },
      // 768px
      md: {
        span: 4,
        offset: 8,
        pull: 8,
        order: 22,
      },
      // 992px
      lg: {
        span: 4,
        offset: 8,
        pull: 8,
        order: 22,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 8,
        pull: 8,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 8,
        pull: 8,
        order: 22,
      },
    },
  },
};

export { localFieldConfig };
