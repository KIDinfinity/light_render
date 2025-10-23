export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'zipCode',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'zipCode',
    },
    expand: 'N',
    visible: 'N',
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
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
  },
};
