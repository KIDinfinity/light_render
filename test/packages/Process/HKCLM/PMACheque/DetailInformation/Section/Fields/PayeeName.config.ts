const localFieldConfig = {
  atomGroupCode: 'HK_CR_CTG001.HK_CR_ACT001',
  caseCategory: 'HK_CR_CTG001',
  activityCode: 'HK_CR_ACT001',
  section: 'DetailInformation',
  field: 'payeeName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'pmaCheque.payeeName',
    },
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
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_ChequePayee',
    },
    rules: ['VLD_000800']
  },
};

export { localFieldConfig };
