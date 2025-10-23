export const fieldConfig = {
  section: 'Fund-Table',
  field: 'fundAllocation',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_FND',
      dictCode: 'Allocation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['VLD_000850', 'VLD_000632'],
  },
};
