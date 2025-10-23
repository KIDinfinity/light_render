const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'dateOfConsultation',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
    visible: 'Y',
    editable: 'C',
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
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'OP',
        },
      ],
    },
    'x-layout': {
      xs: {
        span: 12,
        offset: 12,
        pull: 12,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    // 'x-rules': [
    //   'VLD_000607',
    //   'VLD_000607_incidentDate',
    //   'VLD_000607_firstConsultationDate',
    //   'consultationDateEarlierDeathDate',
    // ],
  },
};

export { localFieldConfig };
