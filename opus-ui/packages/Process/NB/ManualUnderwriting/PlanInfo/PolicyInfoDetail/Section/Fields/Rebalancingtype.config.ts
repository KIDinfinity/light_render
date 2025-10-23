export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'rebalancingType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'privateFundFlag',
          },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'RebalancingType',
    },
    expand: 'Y',
    required: 'N',
    visible: 'C',

    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 56,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_RebalancingType',
    },
  },
};
