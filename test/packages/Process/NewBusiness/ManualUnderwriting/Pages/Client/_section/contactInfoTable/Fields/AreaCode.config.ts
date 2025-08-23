export const fieldConfig = {
  section: 'ContactInfo-Table',
  field: 'areaCode',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AreaCode',
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
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 29,
      },
    },
  },
};
