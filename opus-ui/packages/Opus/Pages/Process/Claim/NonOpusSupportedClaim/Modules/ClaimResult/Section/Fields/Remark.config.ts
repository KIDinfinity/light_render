const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'ClaimResult',
  field: 'remark',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Remark',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
