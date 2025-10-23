const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  field: 'transactionTypeCode',
  section: 'RequestType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Transaction',
      dictCode: 'TransactionType',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
