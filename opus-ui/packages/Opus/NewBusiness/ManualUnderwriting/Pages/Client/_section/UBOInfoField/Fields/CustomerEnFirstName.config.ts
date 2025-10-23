export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'customerEnFirstName',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'FirstName',
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
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};
