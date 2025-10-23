const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'agentName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'AgentName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
