const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddressChangeInfo',
  field: 'currentAddress',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CurrentAddress',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 8,
        pull: 8,
        order: 1,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
