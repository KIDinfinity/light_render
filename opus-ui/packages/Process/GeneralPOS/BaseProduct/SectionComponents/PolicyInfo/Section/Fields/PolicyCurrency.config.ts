const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'policyCurrency',
  'field-props': {
    visible: 'N',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyCurrency',
    },
    'x-dict': { dictTypeCode: 'PolicyCurrency' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
