const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionInfo',
  field: 'moniesDate',
  'field-props': {
    visible: 'C',
    editable: 'C',
    required: 'C',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_SRV',
      dictCode: 'MoniesDate',
    },
    'visible-condition': {
      conditions: [
        {
          left: {
            field: 'transactionTypeCode',
            domain: 'field',
          },
          right: 'SRV003',
          operator: '===',
        },
      ],
      combine: '&&',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
