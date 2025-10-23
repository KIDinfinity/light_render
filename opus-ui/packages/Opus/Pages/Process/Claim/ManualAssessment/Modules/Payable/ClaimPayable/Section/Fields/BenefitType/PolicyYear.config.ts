const localFieldConfig = {
  section: 'Payable_ClaimPayable_BenefitType',
  field: 'policyYear',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'calculateByPolicyYear' }, operator: '===', right: 'Y' },
        { left: { domain: 'field', field: 'calculateByPolicyYear' }, operator: '===', right: 'F' },
      ],
    },
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PolicyYear',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['checkClaimPayableListByPolicyYear'],
  },
};

export { localFieldConfig };
