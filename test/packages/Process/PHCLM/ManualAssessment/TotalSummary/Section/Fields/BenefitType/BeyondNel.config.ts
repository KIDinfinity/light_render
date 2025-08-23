const localFieldConfig = {
  section: 'SummaryPayable',
  field: 'beyondNEL',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'beyondNel',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 12,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
