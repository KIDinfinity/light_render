export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'customerRole',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_OpusUBO',
      dictCode: 'CustomerRole',
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
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_UBORole',
    },
  },
};
