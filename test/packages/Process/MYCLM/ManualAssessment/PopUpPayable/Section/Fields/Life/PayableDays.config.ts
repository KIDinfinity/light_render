const localFieldConfig = {
  section: 'PopUpPayable.Life',
  field: 'payableDays',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BasicPayableDays',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };
