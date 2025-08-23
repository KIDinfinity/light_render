export const fieldConfig = {
  section: 'TakeOver-Table',
  field: 'policyNo',
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
      dictCode: 'PolicyNo',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 576px
      sm: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 768px
      md: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 992px
      lg: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 1200px
      xl: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
      // 1600px
      xxl: {
        span: 6.0,
        offset: 0,
        pull: 0,
        order: 2.0,
      },
    },
  },
};
