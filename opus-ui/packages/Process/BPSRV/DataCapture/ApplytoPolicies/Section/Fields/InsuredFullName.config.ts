const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ApplytoPolicies',
  field: 'insuredFullName',
  'field-props': {
    view: 'Y',
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'InsuredName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
