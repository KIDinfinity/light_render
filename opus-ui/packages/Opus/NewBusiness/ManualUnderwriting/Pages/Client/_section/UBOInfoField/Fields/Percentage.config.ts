export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'holdingPercentage',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [{ left: '$companyLegalForm', operator: '===', right: 'N' }],
    },
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_OpusUBO',
      dictCode: 'Percentage',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};
