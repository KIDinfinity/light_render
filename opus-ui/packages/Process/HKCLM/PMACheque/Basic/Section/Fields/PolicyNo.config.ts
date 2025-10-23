const localFieldConfig = {
  atomGroupCode: 'HK_CR_CTG001.HK_CR_ACT001',
  caseCategory: 'HK_CR_CTG001',
  activityCode: 'HK_CR_ACT001',
  section: 'Basic',
  field: 'policyNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'submissionChannel' }, operator: '!==', right: 'RCS' },
      ],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'PolicyNo',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
