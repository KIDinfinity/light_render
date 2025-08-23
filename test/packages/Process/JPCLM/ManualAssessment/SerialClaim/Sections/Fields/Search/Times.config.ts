const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'SerialClaim.Search',
  field: 'times',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    dateFormat: 'L',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      // TODO：需要国际化
      dictCode: '治療期間',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        orspan: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        orspan: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        orspan: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        orspan: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        orspan: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
