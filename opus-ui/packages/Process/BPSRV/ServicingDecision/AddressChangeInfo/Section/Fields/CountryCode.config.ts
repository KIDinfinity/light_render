const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'AddressChangeInfo',
  field: 'countryCode',
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
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Country',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_Country' },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
