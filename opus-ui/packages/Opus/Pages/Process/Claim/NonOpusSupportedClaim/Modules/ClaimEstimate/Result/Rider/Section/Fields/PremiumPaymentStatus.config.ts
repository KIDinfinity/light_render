const localFieldConfig = {
  section: 'ClaimEstimation-Result-Rider',
  field: 'premiumPaymentStatus',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'premiumPaymentStatus',
    },
    expand: 'N',
    'x-dict': { dictTypeCode: 'Dropdown_POL_PremiumStatus' },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };
