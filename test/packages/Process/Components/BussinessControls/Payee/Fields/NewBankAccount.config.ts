const localFieldConfig = {
  section: 'payee',
  field: 'isNewBankAccount',
  'field-props': {
    visible: 'Y',

    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'isNewBankAct',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
    maxLength: 30,
    required: 'N',
    editable: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

export { localFieldConfig };
