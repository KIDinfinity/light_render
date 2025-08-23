const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawlForTotal',
  field: 'fundChargeAmt',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SurrenderCharge',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 736px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
