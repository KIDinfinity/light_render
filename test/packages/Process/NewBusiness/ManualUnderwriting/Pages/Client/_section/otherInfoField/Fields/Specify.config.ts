export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'specify',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Specify',
    },
    expand: 'N',
    required: 'C',
    visible: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'FIELD', field: 'promotionsBy' },
          operator: 'in',
          right: ['Twitter', 'Facebook'],
        },
      ],
    },
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'FIELD', field: 'promotionsBy' },
          operator: 'in',
          right: ['Twitter', 'Facebook'],
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};
