const localFieldConfig = {
  section: 'SummaryPayable',
  field: 'denyWithRescissionCheck',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimDecision' },
          operator: '===',
          right: 'D',
        },
        {
          left: { domain: 'field', field: 'claimDecision' },
          operator: '===',
          right: 'P',
        },
      ],
    },
    editable: 'C',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'denyWithRescissionFlg',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
