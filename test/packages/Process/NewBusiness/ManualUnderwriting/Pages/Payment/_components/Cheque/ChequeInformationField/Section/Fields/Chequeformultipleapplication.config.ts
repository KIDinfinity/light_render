export const fieldConfig = {
  section: 'ChequeInformation-Field',
  field: 'chequeForMultipleApplication',
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
      dictCode: 'ChequeForMultipleApplication',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
