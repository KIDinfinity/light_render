const localFieldConfig = {
  section: 'Treatment',
  field: 'hospitalType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalType',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_HospitalType' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
