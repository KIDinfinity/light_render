
const localFieldConfig = {
  section: 'Insured',
  field: 'dateTimeOfDeath',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    dateFormat: 'L LTS',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };
