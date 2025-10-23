
const localFieldConfig = {
  section: 'PopUpPayable.BenefitItem',
  field: 'insurerCoInsuranceAmount',
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
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'CopayAmount',
    },
    'x-layout': {
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
  },
};

export { localFieldConfig };