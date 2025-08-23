export const fieldConfig = {
  section: 'InitialPaymentInfo-Table',
  field: 'haveCreditCard',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'HaveCreditCard',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 25,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
