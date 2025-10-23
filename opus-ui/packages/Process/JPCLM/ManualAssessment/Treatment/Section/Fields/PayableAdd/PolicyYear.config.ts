const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Payable.Add',
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
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PolicyYear',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
