const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Suitability',
  field: 'riskToleranceLevel',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'suitabilityDate' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'riskToleranceLevel' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'suitabilityScore' }, operator: 'not empty' },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'RiskToleranceLev',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_RiskToleranceLevel',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 10,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
