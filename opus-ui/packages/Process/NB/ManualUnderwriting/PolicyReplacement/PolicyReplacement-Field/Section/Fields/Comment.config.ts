export const fieldConfig = {
  section: 'PolicyReplacement- Field',
  field: 'comment',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'comment',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
