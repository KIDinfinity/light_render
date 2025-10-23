const localFieldConfig = {
  section: 'ClaimEstimation-Result-Basic',
  field: 'productCode',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_Sider_360',
      dictCode: 'MainProduct',
    },
    'x-dict': { dictTypeCode: 'Dropdown_PRD_Product' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
