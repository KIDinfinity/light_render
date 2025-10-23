const localFieldConfig = {
  section: 'Incident.Header',
  field: 'subClaimType',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimTypeArray' },
          operator: 'contains',
          right: 'IP',
        },
      ],
    },
    editable: 'C',
    required: 'N',
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_SubClaimType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
