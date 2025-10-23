
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable.Basic',
  field: 'claimDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.claim-decision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_ClaimDecision' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };