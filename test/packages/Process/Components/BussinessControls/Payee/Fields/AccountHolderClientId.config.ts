const localFieldConfig = {
  section: 'payee',
  field: 'accountHolderClientId',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'accountHolderID',
    },
    maxLength: 30,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

export { localFieldConfig };
