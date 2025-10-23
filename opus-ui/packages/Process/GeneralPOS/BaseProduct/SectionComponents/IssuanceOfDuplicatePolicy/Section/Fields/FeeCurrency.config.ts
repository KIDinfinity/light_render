const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'IssuanceOfDuplicatePolicy',
  field: 'feeCurrency',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'Currency',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_Currency' },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
