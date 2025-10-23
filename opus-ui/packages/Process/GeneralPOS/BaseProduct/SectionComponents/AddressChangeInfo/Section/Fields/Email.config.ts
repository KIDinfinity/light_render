const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddressChangeInfo',
  field: 'email',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'email' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'homeNo' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'phoneNo' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'workNo' }, operator: 'not empty' },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'EmailAddress',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
      // 576px
      sm: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
      // 768px
      md: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
      // 992px
      lg: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 19,
        pull: 19,
        order: 7,
      },
    },
    'x-rules': ['VLD_000618'],
  },
};

export { localFieldConfig };
