
const localFieldConfig = {
  section: 'Insured',
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
        order: 13,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };
