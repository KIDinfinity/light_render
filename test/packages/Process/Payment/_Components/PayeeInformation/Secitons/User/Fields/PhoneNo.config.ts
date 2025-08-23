const localFieldConfig = {
  section: 'payee.User',
  field: 'phoneNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'PhoneNoAndFPSID',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
      // 576px
      sm: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
      // 768px
      md: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
      // 992px
      lg: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 5,
        pull: 5,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
