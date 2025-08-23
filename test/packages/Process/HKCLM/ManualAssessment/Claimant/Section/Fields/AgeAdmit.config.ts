const localFieldConfig = {
  section: 'Claimant',
  field: 'ageAdmitIndicator',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AgeAdmit',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'x-rules': ['VLD_001123'],
  },
};

export { localFieldConfig };
