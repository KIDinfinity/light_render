const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ContactChangeInfo',
  field: 'countryCodeOfPhoneNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'MobilePhoneNo',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_ContactCountryCode' },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 0,
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
