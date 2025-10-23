export const localFieldConfig = {
  section: 'NewRequestClaimPackReturn',
  field: 'hostClaimNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'type' },
          operator: '===',
          right: 'NewRequestClaimPackReturn',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'hostClaimNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 586px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 868px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};
