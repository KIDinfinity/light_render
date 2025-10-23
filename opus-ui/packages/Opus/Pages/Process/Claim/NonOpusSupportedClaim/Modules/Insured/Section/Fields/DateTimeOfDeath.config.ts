const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'Insured',
  field: 'dateTimeOfDeath',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    dateFormat: 'L LTS',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
    expand: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
  },
};

export { localFieldConfig };
