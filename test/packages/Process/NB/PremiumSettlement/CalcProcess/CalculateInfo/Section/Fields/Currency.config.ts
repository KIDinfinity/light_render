export const fieldConfig = {
  section: 'AdjustPremium',
  field: 'currency',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Currency',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'required-condition': {
      conditions: [
        {
          left: { domain: 'field', field: 'adjustPremium' },
          operator: 'not empty',
        },
      ],
      combine: '&&',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Currency',
    },
  },
};
