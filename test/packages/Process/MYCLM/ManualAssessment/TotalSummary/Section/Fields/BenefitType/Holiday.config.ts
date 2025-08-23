const localFieldConfig = {
  section: 'SummaryPayable',
  field: 'holiday',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'holidayFlg',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      //592px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };
