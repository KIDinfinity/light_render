const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'OtherProcedure.Payable',
  field: 'radioDateList',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'benefitCategory' }, operator: '===', right: 'CIC' },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'clmReferenceDate',
    },
    'x-rules': ['VLD_000755'],
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
  },
};

export { localFieldConfig };
