const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SettlementBankAccountNominationForNewAccount',
  field: 'sourceBank',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SourceBank',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POS_SrcBank_Check' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
