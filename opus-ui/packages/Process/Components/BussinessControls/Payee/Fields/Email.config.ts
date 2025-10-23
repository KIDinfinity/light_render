const localFieldConfig = {
  section: 'payee',
  field: 'email',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    maxLength: 60,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 21,
      },
    },
  },
};

export { localFieldConfig };
