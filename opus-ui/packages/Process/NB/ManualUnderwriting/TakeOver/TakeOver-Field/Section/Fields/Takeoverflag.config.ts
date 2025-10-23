export const fieldConfig = {
  section: 'TakeOver-Field',
  field: 'takeOverFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'TakeOverFlag',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 576px
      sm: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 768px
      md: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 992px
      lg: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 1200px
      xl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 1600px
      xxl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
