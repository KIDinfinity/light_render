const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SettlementBankAccountNomination',
  field: 'currentTo',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'ApplicationDateTo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
