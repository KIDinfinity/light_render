
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Incident.Basic',
  field: 'subClaimType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'subClaimType',
    },
    'x-dict': { dictTypeCode: '{"IP": "Dropdown_CLM_SubClaimType_IPD", "OP":"Dropdown_CLM_SubClaimType_OPD"}' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
