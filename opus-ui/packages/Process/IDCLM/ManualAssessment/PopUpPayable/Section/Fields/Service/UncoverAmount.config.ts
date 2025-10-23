
const localFieldConfig = {
  section: 'PopUpPayable.Service',
  field: 'uncoverAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'UncoverAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };