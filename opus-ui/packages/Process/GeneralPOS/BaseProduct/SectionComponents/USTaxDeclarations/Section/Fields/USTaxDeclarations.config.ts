const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'uSTaxDeclarations',
  field: 'usTaxDeclarations',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: ' ',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
    'x-rules': ['VLD_001202'],
  },
};

export { localFieldConfig };
