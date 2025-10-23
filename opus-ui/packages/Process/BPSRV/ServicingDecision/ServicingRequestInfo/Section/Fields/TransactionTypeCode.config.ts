const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ServicingRequestInfo',
  field: 'transactionTypeCode',
  'field-props': {
    visible: 'Y',
    editable: 'N',
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
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
