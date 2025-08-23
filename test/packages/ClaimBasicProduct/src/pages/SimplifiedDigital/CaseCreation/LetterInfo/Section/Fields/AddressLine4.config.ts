const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'letterInfo',
  field: 'address4',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Address4',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
