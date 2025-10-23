const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  field: 'refundBasis',
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
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'denyWithRescissionCheck' },
          operator: '===',
          right: 1,
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'denyWithRescissionCheck' },
          operator: '===',
          right: 1,
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'refundBas',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_PHRefundBasis' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
