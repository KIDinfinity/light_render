const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'InvestmentConsultant',
  field: 'investmentConsultantsICCode',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'requester' },
          operator: '===',
          right: 'IC',
        },
      ],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'ICCode',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': ['VLD_000815'],
  },
};

export { localFieldConfig };
