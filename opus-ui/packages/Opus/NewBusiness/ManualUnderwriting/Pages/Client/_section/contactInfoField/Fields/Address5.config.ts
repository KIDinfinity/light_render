export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'address5',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AddressLine5',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'Y',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'addrType' },
          operator: '!==',
          right: undefined,
        },
        {
          left: { domain: 'field', field: 'addrType' },
          operator: '!==',
          right: null,
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
