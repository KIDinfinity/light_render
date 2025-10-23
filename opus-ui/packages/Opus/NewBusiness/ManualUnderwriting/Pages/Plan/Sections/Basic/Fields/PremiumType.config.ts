export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'premiumType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PremiumType',
    },
    expand: 'Y',
    required: 'C',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 29,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_PremiumPayType',
    },
  },
};
