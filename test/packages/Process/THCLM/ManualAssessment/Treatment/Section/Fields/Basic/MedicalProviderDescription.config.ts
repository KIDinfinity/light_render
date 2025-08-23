
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'medicalProviderDescription',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'medicalProvider' },
          operator: 'in',
          right: ['996', '997', '998', '999', '00001'],
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'medicalProvider' },
          operator: 'in',
          right: ['996', '997', '998', '999', '00001'],
        },
      ],
    },
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'MedicalProviderDescription',
    },
    maxLength: 240,
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };