const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FeeItem',
  field: 'feeItem',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'feeItem',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 15,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
