const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PolicyInfo',
  field: 'paymentMethod',
  'field-props': {
    visible: 'N',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentMethod',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_PaymentMethod' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
