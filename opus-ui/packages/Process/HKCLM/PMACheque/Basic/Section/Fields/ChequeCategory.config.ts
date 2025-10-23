const localFieldConfig = {
  atomGroupCode: 'HK_CR_CTG001.HK_CR_ACT001',
  caseCategory: 'HK_CR_CTG001',
  activityCode: 'HK_CR_ACT001',
  section: 'Basic',
  field: 'chequeCategory',
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
      dictCode: 'pmaCheque.chequeCategory',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_ChequeCategory' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
