const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'uSTaxDeclarations',
  field: 'taxDeclarationsFlag',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'PH_US_Declaration',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
      // 576px
      sm: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
      // 768px
      md: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
      // 992px
      lg: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 6,
        pull: 6,
        order: 1,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
