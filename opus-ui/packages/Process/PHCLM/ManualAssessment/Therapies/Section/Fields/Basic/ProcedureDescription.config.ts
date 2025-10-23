const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'Procedure',
  field: 'procedureDescription',
  'field-props': {
    visible: 'C',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'procedureCode' }, operator: '===', right: 'OTHS' },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ProcedureDescription',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
