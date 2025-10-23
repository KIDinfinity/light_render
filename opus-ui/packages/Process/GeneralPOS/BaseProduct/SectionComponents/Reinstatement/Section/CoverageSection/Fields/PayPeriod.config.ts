const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Reinstatement-Coverage',
  field: 'payPeriod',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PremiumTerm',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
       span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
       span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
       span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
       span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
       span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };
