const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FundSwitching',
  field: 'fxRateRiskFlag',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'AcknowledgedFXFunds',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 1,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
