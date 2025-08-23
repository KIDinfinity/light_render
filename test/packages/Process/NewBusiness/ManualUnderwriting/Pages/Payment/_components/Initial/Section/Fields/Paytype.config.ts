export const fieldConfig = {
  section: 'InitialPaymentInfo-Table',
  field: 'payType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentMethod',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_PaymentMethod',
    },
  },
};
