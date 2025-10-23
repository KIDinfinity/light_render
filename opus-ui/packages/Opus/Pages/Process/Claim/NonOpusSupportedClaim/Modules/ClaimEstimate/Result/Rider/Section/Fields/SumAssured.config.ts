const localFieldConfig = {
  section: 'ClaimEstimation-Result-Rider',
  field: 'sumAssured',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'SumAssured',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
