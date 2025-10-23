const localFieldConfig = {
  section: 'ClaimEstimation-Treatment',
  field: 'inpatientDays',
  'field-props': {
    visible: 'Y',
    required: 'N',
    editable: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'inpatientDays',
    },

    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
