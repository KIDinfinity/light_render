export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'facType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'FACType',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 45,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_FACType',
    },
  },
};
