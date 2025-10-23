const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'OtherProcedure.Payable',
  field: 'assessorOverrideTimes',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'benefitCategory' },
          operator: '===',
          right: 'CIC',
        },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'overrideNumberOfTherapeuticMonth',
    },
    'x-rules': ['VLD_000755'],
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };
