const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'trustPolicy',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'TrustPolicy',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
