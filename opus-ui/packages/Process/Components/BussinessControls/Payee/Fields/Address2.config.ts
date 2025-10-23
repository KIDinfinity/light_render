const localFieldConfig = {
  section: 'payee',
  field: 'address2',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: '住所カナ', // TODO: 国际化
    },
    maxLength: 70,
    editable: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 24,
      },
    },
  },
};

export { localFieldConfig };
