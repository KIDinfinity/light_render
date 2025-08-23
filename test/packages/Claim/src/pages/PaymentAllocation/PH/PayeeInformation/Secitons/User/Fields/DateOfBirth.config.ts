const localFieldConfig = {
  section: 'payee.User',
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
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        spspan: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        spspan: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        spspan: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        spspan: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        spspan: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
