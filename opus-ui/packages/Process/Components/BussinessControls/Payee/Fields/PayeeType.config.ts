const localFieldConfig = {
  section: 'payee',
  field: 'payeeType',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.payee-type',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_PayeeType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
