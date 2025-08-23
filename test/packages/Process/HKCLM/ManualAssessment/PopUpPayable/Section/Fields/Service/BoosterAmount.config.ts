const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUpPayable.Service',
  field: 'boosterAmount',
  'field-props': {
    visible: 'Y',
    // 'visible-condition': {
    //   combine: '&&',
    //   conditions: [
    //     {
    //       left: { domain: 'field', field: 'isStandaloneBooster' },
    //       operator: '!==',
    //       right: 'Y',
    //     },
    //   ],
    // },
    editable: 'C',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BoosterPayableAmount',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    precision: 2,
    max: 999999999,
    min: -999999999,
  },
};

export { localFieldConfig };
