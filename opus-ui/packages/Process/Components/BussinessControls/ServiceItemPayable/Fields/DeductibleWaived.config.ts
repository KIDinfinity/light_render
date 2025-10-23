const localFieldConfig = {
  section: 'ServiceItemPayable',
  field: 'deductibleWaived',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DeductibleWaived',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 586px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 868px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };
