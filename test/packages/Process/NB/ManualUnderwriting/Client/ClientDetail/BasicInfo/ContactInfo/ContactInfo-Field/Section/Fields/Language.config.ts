export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'language',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_PreferredLanguage',
    },
  },
};
