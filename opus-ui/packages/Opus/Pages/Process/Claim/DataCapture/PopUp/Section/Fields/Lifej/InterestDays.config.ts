const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.lifej',
  field: 'interestDays',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'claimTypeArray' },
          operator: 'contains',
          right: 'WOP',
        },
        {
          left: { domain: 'field', field: 'interestFlag' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'interestDays',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };
