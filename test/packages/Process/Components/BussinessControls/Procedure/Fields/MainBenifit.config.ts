const localFieldConfig = {
  section: 'Procedure',
  field: 'mainBenefit',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'venus-claim-label-mainBenefit',
    },
    'x-dict': { dictTypeCode: 'MainBenefit' },
    'x-layout': {
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
