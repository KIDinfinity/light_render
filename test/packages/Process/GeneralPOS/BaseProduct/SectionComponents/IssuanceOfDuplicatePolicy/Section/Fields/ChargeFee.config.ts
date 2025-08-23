const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'IssuanceOfDuplicatePolicy',
  field: 'chargeFee',
  'field-props': {
    visible: 'Y',
    editable: 'Y',

    required: 'N',

    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'ChargeFee',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
