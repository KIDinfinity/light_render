
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'Service',
  field: 'payableDays',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'booster' }, operator: '!==', right: 'Y' }],
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'booster' }, operator: '!==', right: 'Y' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BasicPayableDays',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
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
