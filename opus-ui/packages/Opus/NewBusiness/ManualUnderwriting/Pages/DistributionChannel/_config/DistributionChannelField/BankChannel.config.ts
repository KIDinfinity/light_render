export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'bankNo',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'bankChannel',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_BankChannel',
    },
  },
};
