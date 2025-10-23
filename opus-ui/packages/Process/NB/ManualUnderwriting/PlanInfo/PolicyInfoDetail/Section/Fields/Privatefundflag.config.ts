export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'privateFundFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'privateFundFlag',
    },
    expand: 'Y',
    required: 'N',
    visible: 'C',

    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 57,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
