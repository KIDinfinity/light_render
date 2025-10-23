const localFieldConfig = {
  section: 'payee',
  field: 'sms',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'SMS',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_SMS',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },
  },
};

export { localFieldConfig };
