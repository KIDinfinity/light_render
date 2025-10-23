const localFieldConfig = {
  section: 'TreatmentPayable.benefitItem',
  field: 'calculationAmount',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'benefitCategory' },
          operator: 'not in',
          right: ['A', 'C'],
        },
      ],
    },
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BillAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
