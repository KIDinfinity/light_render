export const fieldConfig = {
  section: 'UWDecision-Table',
  field: 'unit',
  fieldType: 'Number',
  'field-props': {
    expand: 'Y',
    visible: 'C',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'NoUnit',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};
