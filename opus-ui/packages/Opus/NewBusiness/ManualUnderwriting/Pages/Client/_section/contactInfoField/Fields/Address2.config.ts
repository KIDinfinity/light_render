export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'address2',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AddressLine2',
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
        order: 14,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};
