const localFieldConfig = {
  section: 'Treatment',
  field: 'icuFromDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.form-date',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    // 'x-rules': ['fromIcuDateEarlierDischargeDate', 'fromIcuDateLaterAdmissionDate'],
  },
};

export { localFieldConfig };
