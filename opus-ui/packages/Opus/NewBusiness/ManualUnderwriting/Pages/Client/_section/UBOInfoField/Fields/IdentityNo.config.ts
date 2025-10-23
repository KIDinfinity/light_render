export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'identityNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_OpusUBO',
      dictCode: 'IDNo',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [{ left: '$companyLegalForm', operator: '===', right: 'N' }],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': ['VLD_000269'],
  },
};
