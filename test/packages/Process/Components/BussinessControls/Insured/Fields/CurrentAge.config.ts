const localFieldConfig = {
  section: 'Insured',
  field: 'currentAge',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ClaimantAge',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};

export { localFieldConfig };
