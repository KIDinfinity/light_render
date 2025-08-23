const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FreelookCancellation',
  field: 'otherReason',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'OtherReason',
    },
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'cancelReasonCode' },
          operator: '===',
          right: 'SR006',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
