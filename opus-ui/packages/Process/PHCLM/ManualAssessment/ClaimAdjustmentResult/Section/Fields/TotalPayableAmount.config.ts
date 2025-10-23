const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ClaimAdjustment',
  field: 'totalPayableAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'totalAdjAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 2,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
