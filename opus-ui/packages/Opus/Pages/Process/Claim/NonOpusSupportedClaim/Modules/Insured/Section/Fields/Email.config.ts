const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'Insured',
  field: 'email',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    maxLength: 60,
    expand: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
