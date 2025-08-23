const localFieldConfig = {
  section: 'payee.User',
  field: 'email',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 5,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };
