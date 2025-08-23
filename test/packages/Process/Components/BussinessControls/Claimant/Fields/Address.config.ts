const localFieldConfig = {
  section: 'Claimant',
  field: 'address',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.address',
    },
    maxLength: 240,
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
        span: 16,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },
  },
};

export { localFieldConfig };
