const localFieldConfig = {
  section: 'Treatment',
  field: 'medicalProviderDescription',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'MedicalProviderDescription',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
