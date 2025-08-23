
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'icuFromDate',
  'field-props': {
    visible: 'N',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'IP',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'icu' }, operator: '===', right: 1 }],
    },
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
        order: 16,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};

export { localFieldConfig };