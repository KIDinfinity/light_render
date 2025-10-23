export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'eDocument',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'DocumentDeliveryMode',
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
        order: 38,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 38,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 38,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 38,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 38,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 38,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_DocumentMode',
    },
  },
};
