export const fieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeCurrency',
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
      dictCode: 'PaymentSlipCurrency',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};
