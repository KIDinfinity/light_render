export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'nationality',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Nationality',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        { left: '$companyLegalForm', operator: '===', right: 'N' },
        { left: '$customerType', operator: '===', right: 'P' },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Country',
    },
  },
};
