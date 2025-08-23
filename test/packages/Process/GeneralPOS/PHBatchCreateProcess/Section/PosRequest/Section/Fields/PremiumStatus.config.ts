const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PosRequestInfo',
  field: 'premiumStatus',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'venus_claim.phowb.dataCapture.label.requestInformation.premiumStatus',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_PremiumStatus' },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
