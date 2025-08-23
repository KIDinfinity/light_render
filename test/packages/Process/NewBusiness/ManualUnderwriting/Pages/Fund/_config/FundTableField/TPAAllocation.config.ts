export const fieldConfig = {
  section: 'Fund-Table',
  field: 'tpaAllocation',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_FND',
      dictCode: 'TPAAllocation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'epaAllocation' },
          operator: 'empty',
          right: '',
        },
      ],
    },
    'x-rules': ['VLD_000850'],
  },
};
