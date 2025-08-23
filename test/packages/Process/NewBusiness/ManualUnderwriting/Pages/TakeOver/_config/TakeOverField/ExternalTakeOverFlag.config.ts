export const fieldConfig = {
  section: 'TakeOver-Field',
  field: 'extTakeOverFlag',
  fieldType: 'Dropdown',
  'field-props': {
    'visible-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'code', field: 'takeOverFlag' }, operator: '===', right: 'Y' }],
    },
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'extTakeOverFlag',
    },
    expand: 'N',
    required: 'Y',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 576px
      sm: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 768px
      md: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 992px
      lg: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 1200px
      xl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 1600px
      xxl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_ExtTakeOverFlag',
    },
  },
};
