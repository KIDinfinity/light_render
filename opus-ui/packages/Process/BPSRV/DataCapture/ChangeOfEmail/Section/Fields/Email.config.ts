const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'EmailChange',
  field: 'email',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'EmailAddress',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['VLD_000618'],
  },
};

export { localFieldConfig };
