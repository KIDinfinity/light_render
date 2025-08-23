const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Payable',
  field: 'benefitItemCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
    },
    'x-dict': { dictCode: 'benefitItemCode', dictName: 'benefitItemName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
