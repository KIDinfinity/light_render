export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'firstPolicyFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_POLICY',
      dictCode: 'MainPolicy',
    },
    expand: 'Y',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
