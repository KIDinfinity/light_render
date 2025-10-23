const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Diagnosis',
  field: 'criticalIllnessName',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    'editable-condition': {
      conditions: [
        { left: { domain: 'field', field: 'criticalIllness' }, operator: '===', right: 1 },
      ],
    },
    required: 'N',
    'required-condition': {
      conditions: [
        { left: { domain: 'field', field: 'criticalIllness' }, operator: '===', right: 1 },
      ],
    },
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.critical-illness-name',
    },
    maxLength: 100,
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
