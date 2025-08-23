const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ChangeRenewalMethod',
  field: 'bankAccountNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    applicable: 'Y',
    mandatory: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'BankAccountNumber',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
