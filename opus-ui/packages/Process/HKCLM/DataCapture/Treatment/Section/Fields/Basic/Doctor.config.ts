const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'doctor',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.name-of-doctor',
    },
    maxLength: 60,
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
    'x-rules': ['doctorLength'],
  },
};

export { localFieldConfig };
