const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawlForTotal',
  field: 'withdrawalUnit',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'withdrawalOpt' },
          operator: '===',
          right: 'U',
        },
      ],
    },
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'Withdrawal(%orunits)',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 736px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': ['VLD_000816', 'VLD_000636', 'VLD_000637'],
  },
};

export { localFieldConfig };
