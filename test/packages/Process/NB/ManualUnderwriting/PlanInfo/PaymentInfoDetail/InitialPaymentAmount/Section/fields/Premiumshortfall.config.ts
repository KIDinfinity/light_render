export const fieldConfig = {
  section: 'InitialPaymentInfo-Table',
  field: 'premiumShortfall',
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
      dictCode: 'PremiumShortfall',
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};
