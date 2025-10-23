const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'preferredMailingAddr',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PreferredMailingAddress',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POS_PreferredMailingAddr' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
