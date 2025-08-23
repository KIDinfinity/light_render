const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SingleTopUp',
  field: 'topupAmount',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'TopUpValue',
      dictName: 'Top Up Value',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 6,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
