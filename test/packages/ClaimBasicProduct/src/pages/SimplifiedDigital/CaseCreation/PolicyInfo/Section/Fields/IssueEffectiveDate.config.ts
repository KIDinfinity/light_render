const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'issueEffectiveDate',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyIssueDate',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
