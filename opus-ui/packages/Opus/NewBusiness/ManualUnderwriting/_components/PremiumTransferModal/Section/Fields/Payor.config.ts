const localFieldConfig = {
  section: 'PremiumInformation',
  field: 'payor',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyPayor',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
