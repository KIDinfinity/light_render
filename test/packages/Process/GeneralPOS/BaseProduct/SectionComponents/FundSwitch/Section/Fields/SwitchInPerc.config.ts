const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FundSwitching',
  field: 'switchInPerc',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SwitchIn',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': ['VLD_000638', 'VLD_000639', 'VLD_000815'],
  },
};

export { localFieldConfig };
