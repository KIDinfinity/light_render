export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'contactType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ContactType',
    },
    expand: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'contactNo' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'contactType' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'countryCode' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_ContactType',
    },
  },
};
