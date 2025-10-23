const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Payable',
  field: 'deductibleNetExpense',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.deductible-amount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 586px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 868px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': ['VLD_000617'],
  },
};

export { localFieldConfig };
