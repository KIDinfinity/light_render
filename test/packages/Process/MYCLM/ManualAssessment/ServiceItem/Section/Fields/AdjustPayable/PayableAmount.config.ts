
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'AdjustService',
  field: 'payableAmount',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'booster' }, operator: '!==', right: 'Y' }],
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'booster' }, operator: '!==', right: 'Y' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'adjClaimAmt',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': ['VLD_000617'],
  },
};

export { localFieldConfig };
