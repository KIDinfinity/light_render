const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'dateOfAdmission',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'treatmentType' }, operator: '===', right: 'IP' },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'treatmentType' }, operator: '===', right: 'IP' },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    // 'x-rules': [
    //   'VLD_000607',
    //   'VLD_000607_incidentDate',
    //   'VLD_000607_firstConsultationDate',
    //   'admissionDateEarlierDeathDate',
    // ],
  },
};

export { localFieldConfig };
