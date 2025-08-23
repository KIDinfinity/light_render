const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable.Service',
  field: 'boosterDays',
  'field-props': {
    visible: 'N',
    editable: 'C',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BoosterPayableDays',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };
