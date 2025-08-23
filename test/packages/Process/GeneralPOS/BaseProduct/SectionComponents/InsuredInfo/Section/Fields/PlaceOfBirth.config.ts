const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'InsuredInfo',
  field: 'CtfPlace',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CtfPlace',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_Country' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
