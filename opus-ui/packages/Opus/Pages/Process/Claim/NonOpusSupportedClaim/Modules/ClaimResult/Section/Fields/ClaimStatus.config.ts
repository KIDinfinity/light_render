const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'ClaimResult',
  field: 'hostClaimStatus',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'C',
    label: {
      dictTypeCode: 'Label_COM_OPUS',
      dictCode: 'claimStatus',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLML_hostClaimStatus' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
