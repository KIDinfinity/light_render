export const fieldConfig = {
  section: 'Load-Table',
  field: 'isNew',
  fieldType: 'Dropdown',
  'field-props': {
    visible: 'Y',
    required: 'Y',
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'IsNew',
    },
    expand: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_NewLoanFlag',
    },
  },
};
