export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'bankStaffPhone',
  fieldType: 'Number',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'BankStaffPhone',
    },
    required: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'agentChannelCode' },
          operator: '===',
          right: 'BANCA',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};
