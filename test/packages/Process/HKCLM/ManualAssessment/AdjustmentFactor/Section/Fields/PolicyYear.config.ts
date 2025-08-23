const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AdjustmentFactor',
  field: 'policyYear',
  'field-props': {
    visible: 'Y',
    // 'visible-condition': {
    //   conditions: [
    //     {
    //       left: { domain: 'field', field: 'displayByPolicyYear' },
    //       operator: '===',
    //       right: 'Y',
    //     },
    //   ],
    // },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BasicPayableAmount',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 2,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
