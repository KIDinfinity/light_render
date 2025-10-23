export const fieldConfig = {
  section: 'RenewalPaymentInfo-Table',
  field: 'maskedNumber',
  fieldType: 'Text',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'creditCardNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': ['VLD_000269'],
  },
};
