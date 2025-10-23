
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ClaimAdjustment',
  field: 'assessmentDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AdjAssessmentDecision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_AssessmentDecision' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 3,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': [
      'VLD_000010HKApproveAndExGratia',
      'VLD_000401',
      'VLD_000400',
      'VLD_000563',
      'VLD_000182HK',
      'VLD_000562',
      'VLD_000202',
    ],
  },
};

export { localFieldConfig };
