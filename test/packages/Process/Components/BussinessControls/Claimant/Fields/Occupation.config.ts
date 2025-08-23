const localFieldConfig = {
  section: 'Claimant',
  field: 'occupation',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.usermanagement.basicInfo.label.occupation',
    },
    'x-dict': { dictCode: 'occupationCode', dictName: 'occupationName', dictTypeCode: 'list' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};

export { localFieldConfig };
