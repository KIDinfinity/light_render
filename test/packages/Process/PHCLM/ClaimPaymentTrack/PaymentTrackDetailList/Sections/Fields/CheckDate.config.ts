const localFieldConfig = {
  section: 'paymentTrackDetail',
  field: 'ctaCheckDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    dateFormat: 'L',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PayoutDate',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };
