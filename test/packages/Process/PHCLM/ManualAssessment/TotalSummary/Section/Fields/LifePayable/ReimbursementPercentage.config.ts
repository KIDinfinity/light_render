const localFieldConfig = {
  section: 'SummaryPayable.LifePayable',
  field: 'reimbursementPercentage',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'reimbursementPct',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
