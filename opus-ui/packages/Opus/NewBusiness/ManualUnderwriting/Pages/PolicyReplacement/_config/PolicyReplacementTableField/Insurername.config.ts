export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'insurerName',
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
      dictCode: 'InsurerName',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
