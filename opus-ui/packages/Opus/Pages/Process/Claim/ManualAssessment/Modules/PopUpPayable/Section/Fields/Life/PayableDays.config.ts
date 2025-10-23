const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable.Life',
  field: 'payableDays',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'payableDays',
    },
    'x-layout': {
      //  TODO: 动态layout
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
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };
