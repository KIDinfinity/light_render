const localFieldConfig = {
  section: 'Service',
  field: 'savingAmount',
  'field-props': {
    visible: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'serviceItem' }, operator: '===', right: '8.0.0' },
        { left: { domain: 'field', field: 'serviceItem' }, operator: '===', right: '8.1.0' },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'savingAmount',
    },
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

export { localFieldConfig };
