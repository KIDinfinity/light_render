const localFieldConfig = {
  section: 'Treatment',
  field: 'chargableDays',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'chargedDay',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
