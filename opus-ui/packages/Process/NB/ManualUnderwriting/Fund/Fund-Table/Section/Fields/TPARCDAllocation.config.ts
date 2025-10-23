export const fieldConfig = {
  section: 'Fund-Table',
  field: 'tpaRcdAllocation',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_FND',
      dictCode: 'TPARCDAllocation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'fundCode' },
          operator: '!==',
          right: 'VI07',
        },
      ],
    },
    'x-rules': ['VLD_000850'],
  },
};
