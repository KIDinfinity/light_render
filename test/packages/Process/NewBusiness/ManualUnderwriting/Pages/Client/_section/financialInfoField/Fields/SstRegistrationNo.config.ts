export const fieldConfig = {
  section: 'FinancialInfo-Field',
  field: 'sstRegistrationNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Entity',
      dictCode: 'sstRegistrationNo',
    },
    expand: 'N',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 10.0,
      },
      // 576px
      sm: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 10.0,
      },
      // 768px
      md: {
        span: 4.0,

        offset: 0,
        pull: 0,
        order: 10.0,
      },
      // 992px
      lg: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 10.0,
      },
      // 1200px
      xl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 10.0,
      },
      // 1600px
      xxl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 10.0,
      },
    },
    'x-rules': ['VLD_001149'],
  },
};
