const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'serviceItemBreakdown',
  field: 'expense',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'C',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 14,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
