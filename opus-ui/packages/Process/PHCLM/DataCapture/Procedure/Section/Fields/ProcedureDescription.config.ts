const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Procedure',
  field: 'procedureDescription',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'therapiesType' },
          operator: '===',
          right: 'Surgery',
        },
      ],
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'procedureCode' },
          operator: '!==',
          right: 'OTHS',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'procedureCode' },
          operator: '===',
          right: 'OTHS',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ProcedureDescription',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
