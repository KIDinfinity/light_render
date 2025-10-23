const localFieldConfig = {
  section: 'Payable_ClaimPayable_BenefitType',
  field: 'denyReason',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'denyReason',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
