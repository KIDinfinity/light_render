const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ServicingRequestInfo',
  field: 'transactionTypeCode',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'activity', field: 'processData.mainPolicyId' },
          operator: 'empty',
        },
        {
          left: { domain: 'activity', field: 'processData' },
          operator: 'empty',
        },
      ],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_SRV',
      dictCode: 'TransactionType',
    },
    'x-dict': { dictTypeCode: 'Dropdown_SRV_TransactionType' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
