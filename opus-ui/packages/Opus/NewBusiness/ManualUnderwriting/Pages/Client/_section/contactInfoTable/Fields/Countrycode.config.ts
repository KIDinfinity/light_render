export const fieldConfig = {
  section: 'ContactInfo-Table',
  field: 'countryCode',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CountryCode',
    },
    expand: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'contactType' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'contactType' },
          operator: '!==',
          right: undefined,
        },
        {
          left: { domain: 'field', field: 'contactType' },
          operator: '!==',
          right: null,
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_ContactCountryCode',
    },
  },
};
