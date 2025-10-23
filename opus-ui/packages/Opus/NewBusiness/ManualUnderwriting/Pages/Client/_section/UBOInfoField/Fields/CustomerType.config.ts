export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'customerType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_OpusUBO',
      dictCode: 'CustomerType',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [{ left: '$companyLegalForm', operator: '===', right: 'N' }],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_CustomerType',
    },
  },
};
