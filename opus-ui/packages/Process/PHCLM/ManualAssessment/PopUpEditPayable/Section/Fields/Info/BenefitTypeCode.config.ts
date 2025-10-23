const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Info',
  field: 'benefitTypeCode',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-type',
    },
    'x-dict': { dictCode: 'benefitTypeCode', dictName: 'benefitTypeName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
