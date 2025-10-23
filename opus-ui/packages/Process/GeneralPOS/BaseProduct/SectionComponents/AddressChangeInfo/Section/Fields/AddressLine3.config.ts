const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddressChangeInfo',
  field: 'addressLine3',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'addressLine1' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'addressLine2' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'addressLine3' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'addressLine4' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'addressLine5' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'zipCode' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'countryCode' }, operator: 'not empty' },
        { left: { domain: 'field', field: 'addressType' }, operator: 'not empty' },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'addressLine3',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
