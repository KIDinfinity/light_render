const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'medicalProvider',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'OP',
        },
      ],
    },
    required: 'Y',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'IP',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': ['VLD_000271'],
  },
};

export { localFieldConfig };
