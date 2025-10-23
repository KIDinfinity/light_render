const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Invoice.Basic',
  field: 'isClaimWithOtherInsurer',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ClaimWithOtherInsurer',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
