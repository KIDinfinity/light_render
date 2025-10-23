export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'customerEnSurname',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_OpusUBO',
      dictCode: 'Surname',
    },
    expand: 'Y',
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
  },
};
