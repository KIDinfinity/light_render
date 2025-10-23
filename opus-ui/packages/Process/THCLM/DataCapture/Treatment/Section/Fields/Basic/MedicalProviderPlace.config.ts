const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'medicalProviderPlace',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'C',
    expand: 'N',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'medicalProvider' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'medicalProviderPlace',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_PlaceOfHospital' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
