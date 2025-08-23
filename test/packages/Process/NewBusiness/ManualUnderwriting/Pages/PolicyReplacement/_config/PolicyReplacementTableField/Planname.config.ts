export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'planName',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Plan Name',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};
