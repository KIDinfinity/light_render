const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'BeneficiaryChange',
  field: 'gender',
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
      dictCode: 'Gender',
    },
    'x-dict': { dictTypeCode: 'Dropdown_IND_Gender' },
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
