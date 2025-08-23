const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Diagnosis',
  field: 'criticalIllness',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.critical-illness-indicator',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
