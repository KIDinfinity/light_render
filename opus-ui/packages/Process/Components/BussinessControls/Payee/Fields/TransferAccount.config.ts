const localFieldConfig = {
  section: 'payee',
  field: 'transferAccount',
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
          operator: '===',
          right: 'PREM',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TransferAccount',
    },
    required: 'N',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'paymentMethod',
    //       },
    //       operator: '!===',
    //       right: 'PREM',
    //     },
    //   ],
    // },
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_TransferAccount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
