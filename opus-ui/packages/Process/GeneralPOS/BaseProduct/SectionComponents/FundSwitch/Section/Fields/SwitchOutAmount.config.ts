const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FundSwitching',
  field: 'switchOutAmount',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'N',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'switchingOutOption' },
          operator: '===',
          right: 'A',
        },
      ],
    },
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SwitchOut',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 736px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['VLD_000816', 'VLD_000636', 'VLD_000849', 'VLD_000862'],
  },
};

export { localFieldConfig };
