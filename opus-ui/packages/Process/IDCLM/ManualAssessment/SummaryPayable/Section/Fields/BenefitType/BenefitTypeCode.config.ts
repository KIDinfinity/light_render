const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  field: 'benefitTypeCode',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimDecision' },
          operator: '!==',
          right: 'N',
        },
      ],
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'hasCallExternalSystem' }, operator: '!==', right: '1' },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'claimDecision' }, operator: '!==', right: 'D' },
      ],
    },
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
