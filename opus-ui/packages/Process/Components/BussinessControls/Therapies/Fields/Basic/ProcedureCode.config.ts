const localFieldConfig = {
  section: 'Procedure',
  field: 'procedureCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.procedure-code',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
