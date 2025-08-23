const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ChangeICP',
  field: 'icpOption',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'icpOption',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_DividendICPlPaymentMethod' },
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'icpEligible' },
          operator: '!==',
          right: 'N',
        },
      ],
    },
    'x-layout': {
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
    'x-rules': [''],
  },
};

export { localFieldConfig };
