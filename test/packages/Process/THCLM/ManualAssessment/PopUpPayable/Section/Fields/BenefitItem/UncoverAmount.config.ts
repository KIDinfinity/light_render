
const localFieldConfig = {
  section: 'PopUpPayable.BenefitItem',
  field: 'uncoverAmount',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        { left: { domain: 'field', field: 'benefitCategory' }, operator: '===', right: 'R' },
        { left: { domain: 'field', field: 'benefitItemCode' }, operator: '!==', right: '' },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'UncoverAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };