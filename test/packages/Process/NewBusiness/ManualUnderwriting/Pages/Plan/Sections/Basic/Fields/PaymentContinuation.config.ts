export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'isContinuePremiumPay',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'paymentContinuation',
    },
    expand: 'Y',
    required: 'C',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 62,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
