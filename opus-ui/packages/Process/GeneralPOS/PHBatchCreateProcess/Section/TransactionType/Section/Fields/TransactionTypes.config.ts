const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PosRequestInfo',
  field: 'transactionTypes',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: ' ',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_POSTransactionType_Batch' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
