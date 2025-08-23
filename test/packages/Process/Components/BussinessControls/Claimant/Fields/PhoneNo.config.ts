const localFieldConfig = {
  section: 'Claimant',
  field: 'phoneNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.usermanagement.basicInfo.label.phone-no',
    },
    maxLength: 20,
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 18,
      },
    },
  },
};

export { localFieldConfig };
