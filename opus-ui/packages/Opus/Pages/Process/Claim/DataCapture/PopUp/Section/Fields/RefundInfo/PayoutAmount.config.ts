const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.PremiumWaiverClaimInfo',
  field: 'lifejRefundPayoutAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PayoutAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 576px
      sm: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 768px
      md: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 4,
        offset: 18,
        pull: 18,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
