export const localFieldConfig = {
  section: 'NewRequestClaimPackReturn',
  field: 'inquiryBusinessNo',
  'field-props': {
    visible: 'Y',
    editable: 'N',
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
      dictCode: 'opusBusinessNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 586px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 868px
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
  },
};
