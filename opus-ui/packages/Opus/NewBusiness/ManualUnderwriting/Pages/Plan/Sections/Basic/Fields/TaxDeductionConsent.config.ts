export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'taxConsent',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'TaxDeductionConsent',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
