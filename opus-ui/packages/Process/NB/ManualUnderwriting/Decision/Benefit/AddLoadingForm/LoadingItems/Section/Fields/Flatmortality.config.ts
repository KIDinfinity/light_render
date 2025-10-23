export const fieldConfig = {
  section: 'Loading-Field',
  field: 'flatMortality',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'FlatMortality',
    },
    expand: 'Y',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'extraMortality' },
          operator: 'empty',
          right: '',
        },
        {
          left: { domain: '', field: 'pmLoading' },
          operator: 'empty',
          right: '',
        },
      ],
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 576px
      sm: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 768px
      md: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 992px
      lg: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 1200px
      xl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 1600px
      xxl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
    },
    'add-loading-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6.0,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_FlatMoritality',
    },
  },
};
