const localFieldConfig = {
  section: 'ClaimEstimation-Result-Rider',
  field: 'surgeryBenefit',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'SGB',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
