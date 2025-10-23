export const fieldConfig = {
  section: 'TakeOver-Table',
  field: 'planName',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Plan Name',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 576px
      sm: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 768px
      md: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 992px
      lg: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1200px
      xl: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1600px
      xxl: {
        span: 12.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
    },
  },
};
