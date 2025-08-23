const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FundAllocation',
  field: 'allocation',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'Allocation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 2,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['VLD_000902', 'VLD_000901'],
  },
};

export { localFieldConfig };
