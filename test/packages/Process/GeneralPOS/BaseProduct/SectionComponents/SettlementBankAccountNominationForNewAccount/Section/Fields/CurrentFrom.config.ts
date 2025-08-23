const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SettlementBankAccountNominationForNewAccount',
  field: 'currentFrom',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'ApplicationDateFrom',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
