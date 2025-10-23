export const fieldConfig = {
  section: 'Fund-Table',
  field: 'epaAllocation',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_FND',
      dictCode: 'EPAAllocation',
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
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'tpaAllocation' },
          operator: 'empty',
          right: '',
        },
      ],
    },
    'x-rules': ['VLD_000850'],
  },
};
