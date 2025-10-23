export const fieldConfig = {
  section: 'Loading-Field',
  field: 'extraMortality',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ExtraMortality',
    },
    expand: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'pmLoading' },
          operator: 'empty',
          right: '',
        },
        {
          left: { domain: 'field', field: 'flatMortality' },
          operator: 'empty',
          right: '',
        },
      ],
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_Multiplier',
    },
  },
};
