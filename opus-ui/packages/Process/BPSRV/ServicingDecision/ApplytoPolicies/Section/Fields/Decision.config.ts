const localFieldConfig = {
  atomGroupCode: 'BP_SRV_CTG001.BP_SRV_ACT003',
  caseCategory: 'BP_SRV_CTG001',
  activityCode: 'BP_SRV_ACT003',
  section: 'ApplytoPolicies',
  field: 'policyDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_SRV',
      dictCode: 'Decision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_SRV_Decision' },
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
    'x-rules': ['VLD_000622'],
  },
};

export { localFieldConfig };
