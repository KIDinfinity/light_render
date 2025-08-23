export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'vulnerableCustomerOption',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'VulnerableCustomerOption',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: '$agentChannelCode',
          operator: 'in',
          right: ['BE', 'BC', 'BANCA', 'BV'],
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_VulnerableCustomer',
    },
  },
};
