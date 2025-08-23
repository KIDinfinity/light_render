const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'BeneficiaryChange',
  field: 'identityNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'clientId' }, operator: 'not empty' }],
    },
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'IdentityNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
