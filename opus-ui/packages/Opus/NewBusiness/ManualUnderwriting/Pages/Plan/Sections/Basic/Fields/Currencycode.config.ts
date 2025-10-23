export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'currencyCode',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'Currency',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 18,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Currency',
    },
  },
};
