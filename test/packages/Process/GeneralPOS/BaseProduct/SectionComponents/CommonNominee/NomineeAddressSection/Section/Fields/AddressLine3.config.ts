const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee-Address',
  field: 'addressLine3',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AddressLine3',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
