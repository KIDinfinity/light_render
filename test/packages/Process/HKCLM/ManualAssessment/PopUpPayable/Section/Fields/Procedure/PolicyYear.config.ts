const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUpPayable.Procedure',
  field: 'policyYear',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BasicPayableAmount',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 5,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
