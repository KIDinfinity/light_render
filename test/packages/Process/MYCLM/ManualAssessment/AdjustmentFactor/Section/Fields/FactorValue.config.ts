const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AdjustmentFactor',
  field: 'factorValue',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'isSelected' },
          operator: '===',
          right: 1,
        },
        {
          left: { domain: 'field', field: 'factorValueType' },
          operator: '===',
          right: 'percentage',
        },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '',
    },
    maxLength: 100,
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 1,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
