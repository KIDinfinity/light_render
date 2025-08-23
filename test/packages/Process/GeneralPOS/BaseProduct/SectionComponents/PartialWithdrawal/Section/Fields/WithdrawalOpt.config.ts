const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PartialWithdrawal',
  field: 'withdrawalOpt',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'WithdrawOption',
    },
    'x-dict': { dictTypeCode: 'Dropdown_WithdrawalOption' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 573px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 738px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1300px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
