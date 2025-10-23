const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  field: 'oldBenefitTypeCode',
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
    editable: 'N',
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
        { left: { domain: 'field', field: 'claimDecision' }, operator: '!==', right: 'N' },
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
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-layout-isLabel': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
