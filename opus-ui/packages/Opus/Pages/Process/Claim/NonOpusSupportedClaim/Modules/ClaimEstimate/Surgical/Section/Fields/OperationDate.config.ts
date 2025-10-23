const localFieldConfig = {
  section: 'ClaimEstimation-Surgical',
  field: 'operationDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
