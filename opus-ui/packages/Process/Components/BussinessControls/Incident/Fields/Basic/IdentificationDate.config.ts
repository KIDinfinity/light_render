const localFieldConfig = {
  section: 'Incident',
  field: 'identificationDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.identification-date',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
