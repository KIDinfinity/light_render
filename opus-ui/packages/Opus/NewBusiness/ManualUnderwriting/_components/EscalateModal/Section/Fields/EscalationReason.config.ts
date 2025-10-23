const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Escalate',
  field: 'escalationReason',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'EscalateReason',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 13,
        offset: 5,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
