const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ApplytoPolicies',
  field: 'policyNo',
  'field-props': {
    view: 'Y',
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
