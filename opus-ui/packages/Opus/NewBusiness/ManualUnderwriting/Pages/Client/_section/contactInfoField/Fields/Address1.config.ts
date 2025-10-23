export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'address1',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AddressLine1',
    },
    expand: 'Y',
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
  },
};
