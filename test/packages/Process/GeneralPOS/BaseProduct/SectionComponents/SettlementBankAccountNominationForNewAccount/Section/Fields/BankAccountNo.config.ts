const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SettlementBankAccountNominationForNewAccount',
  field: 'bankAccountNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'bankNewAdd' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'bankNewAdd' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'BankAccountNumber',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['VLD_001084'],
  },
};

export { localFieldConfig };
