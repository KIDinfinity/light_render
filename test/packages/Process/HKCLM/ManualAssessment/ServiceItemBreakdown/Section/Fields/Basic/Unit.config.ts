const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'serviceItemBreakdown',
  field: 'unit',
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
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['VLD_000614'],
  },
};

export { localFieldConfig };
