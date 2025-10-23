export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'secondaryContactType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ContactType',
    },
    expand: 'N',
    required: 'N',
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_ContactType',
    },
  },
};
