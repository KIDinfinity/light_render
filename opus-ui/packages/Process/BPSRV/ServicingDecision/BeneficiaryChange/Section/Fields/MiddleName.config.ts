const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'BeneficiaryChange',
  field: 'middleName',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'clientId' }, operator: 'not empty' }],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'MiddleName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
