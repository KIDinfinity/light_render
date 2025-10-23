const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Incident.Header',
  field: 'claimTypeArray',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'Y',
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
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
