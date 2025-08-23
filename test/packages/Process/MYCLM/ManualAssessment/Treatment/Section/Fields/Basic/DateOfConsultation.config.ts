const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'dateOfConsultation',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'dateOfVisit',
    },
    visible: 'C',
    editable: 'Y',
    'visible-condition': {
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
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 18,
        pull: 18,
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
