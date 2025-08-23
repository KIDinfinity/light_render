const localFieldConfig = {
  section: 'payee',
  field: 'bankAccountNo',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '!==',
          right: '01',
        },
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '!==',
          right: 'DCA',
        },
      ],
    },
    label: {
      dictCode: 'app.navigator.task-detail-of-data-capture.label.bank-account-no',
    },
    maxLength: 7,
    required: 'N',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};

export { localFieldConfig };
