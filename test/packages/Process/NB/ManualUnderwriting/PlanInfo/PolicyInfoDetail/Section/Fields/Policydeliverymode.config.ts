export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'fillerPipIndicator',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyDeliveryMode',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_DeliveryMode',
    },
  },
};
