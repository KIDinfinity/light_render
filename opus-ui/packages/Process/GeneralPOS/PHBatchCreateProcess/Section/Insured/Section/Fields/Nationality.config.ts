const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'InsuredInfo',
  field: 'nationality',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'venus_claim.phowb.dataCapture.label.policyOwnerInformation.nationality',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_Country' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
