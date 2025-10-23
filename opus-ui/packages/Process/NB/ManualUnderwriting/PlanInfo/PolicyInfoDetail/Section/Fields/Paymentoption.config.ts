export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'paymentOption',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentOption',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_PaymentOption',
    },
  },
};
