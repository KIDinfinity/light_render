const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  field: 'remark',
  'field-props': {
    visible: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'claimDecision' }, operator: '!==', right: 'A' },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.assessment-remark',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
