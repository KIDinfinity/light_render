const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'letterInfo',
  field: 'state',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'State',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
