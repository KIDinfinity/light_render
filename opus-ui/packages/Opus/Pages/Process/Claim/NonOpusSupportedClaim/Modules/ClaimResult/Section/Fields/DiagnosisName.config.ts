const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'ClaimResult',
  field: 'diagnosisName',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DiagnosisName',
    },
    'x-dict': { dictCode: 'dictCode', dictName: 'dictName', dictTypeCode: 'paymentAcceptedResult' },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
