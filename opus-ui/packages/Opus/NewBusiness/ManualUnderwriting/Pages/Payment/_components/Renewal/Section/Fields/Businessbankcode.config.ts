export const fieldConfig = {
  section: 'RenewalPaymentInfo-Table',
  field: 'businessBankCode',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'BankName',
    },
    expand: 'N',
    required: 'C',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
