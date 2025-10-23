const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable.Adjust',
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
      dictCode: 'adjRemark',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
