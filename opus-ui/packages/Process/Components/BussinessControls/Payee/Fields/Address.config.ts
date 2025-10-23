const localFieldConfig = {
  section: 'payee',
  field: 'address',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.address',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
  },
};

export { localFieldConfig };
