const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Payable',
  field: 'payableAmount',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'isStandaloneBooster' }, operator: '!==', right: 'Y' },
      ],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BasicPayableAmount',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
