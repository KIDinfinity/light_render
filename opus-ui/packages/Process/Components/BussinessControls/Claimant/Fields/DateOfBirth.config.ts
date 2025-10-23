const localFieldConfig = {
  section: 'Claimant',
  field: 'dateOfBirth',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    dateFormat: 'L',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };
