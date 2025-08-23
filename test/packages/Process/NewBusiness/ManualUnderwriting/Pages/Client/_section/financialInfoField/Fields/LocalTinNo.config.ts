export const fieldConfig = {
  section: 'FinancialInfo-Field',
  field: 'localTinNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Entity',
      dictCode: 'localTinNo',
    },
    expand: 'N',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
      // 576px
      sm: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
      // 768px
      md: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
      // 992px
      lg: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
      // 1200px
      xl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
      // 1600px
      xxl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9.0,
      },
    },
    'x-rules': ['VLD_001133'],
  },
};
