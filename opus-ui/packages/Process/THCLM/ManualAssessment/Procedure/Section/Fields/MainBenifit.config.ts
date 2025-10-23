
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'MainBenefit',
  field: 'mainBenefit',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'venus-claim-label-mainBenefit',
    },
    'x-dict': { dictTypeCode: 'MainBenefit' },
    'x-layout': {
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };