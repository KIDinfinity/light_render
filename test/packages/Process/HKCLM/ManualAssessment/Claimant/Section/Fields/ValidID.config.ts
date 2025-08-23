const localFieldConfig = {
  section: 'Claimant',
  field: 'idValidityResult',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ValidID',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_IDValidityResult' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };
