const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  field: 'branchCode',
  section: 'IssuanceOfDuplicatePolicy',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'sendTo' },
          operator: '===',
          right: 'B',
        },
      ],
    },
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'BranchCode',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
      //1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
      //1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order:3,
      },
    },
  },
};

export { localFieldConfig };
