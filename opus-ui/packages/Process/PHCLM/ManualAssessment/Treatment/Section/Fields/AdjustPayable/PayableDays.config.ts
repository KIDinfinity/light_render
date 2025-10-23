const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'AdjustTreatmentPayable',
  field: 'payableDays',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'adjPaymentDays',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 2,
      },
    },
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };
