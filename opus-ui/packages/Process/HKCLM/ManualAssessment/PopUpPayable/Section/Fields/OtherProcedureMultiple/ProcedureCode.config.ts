const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUpPayable.OtherProcedureMultiple',
  field: 'procedureCode',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'crisisItem',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_CrisisItem' },
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
