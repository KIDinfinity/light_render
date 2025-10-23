const localFieldConfig = {
  section: 'Incident',
  field: 'partOfBodyInjuredArray',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.post-of-body-injured',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
