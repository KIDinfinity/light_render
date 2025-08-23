export const fieldConfig = {
  section: 'TakeOver-Table',
  field: 'productCode',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
      // 576px
      sm: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
      // 768px
      md: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
      // 992px
      lg: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
      // 1200px
      xl: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
      // 1600px
      xxl: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 4.0,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
