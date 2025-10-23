const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ServicePayable',
  field: 'policyYear',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '111',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };
