const localFieldConfig = {
  section: 'Claimant',
  field: 'email',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    maxLength: 60,
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

export { localFieldConfig };
