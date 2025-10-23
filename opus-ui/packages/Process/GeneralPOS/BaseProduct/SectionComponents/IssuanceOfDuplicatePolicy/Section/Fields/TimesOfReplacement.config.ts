const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'IssuanceOfDuplicatePolicy',
  field: 'timesOfReplacement',
  'field-props': {
    visible: 'Y',
    editable: 'C',

    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'TimesOfReplacement',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['VLD_000902', 'VLD_000901'],
  },
};

export { localFieldConfig };
