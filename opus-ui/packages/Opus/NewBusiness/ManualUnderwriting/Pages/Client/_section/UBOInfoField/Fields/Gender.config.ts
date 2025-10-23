export const fieldConfig = {
  section: 'UBOInfo-Field',
  field: 'gender',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Gender',
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
        order: 7,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_Gender',
    },
  },
};
