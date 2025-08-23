const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'SerialClaim.Search',
  field: 'claimType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.claim-type',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_ClaimType',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
