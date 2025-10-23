const localFieldConfig = {
  section: 'ClaimEstimation-Incident',
  field: 'diagnosisCode',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'icdCode',
    },
    maxLength: 100,

    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
