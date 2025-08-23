
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Payable',
  field: 'boosterDays',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'benefitCategory' }, operator: '===', right: 'R' },
      ],
    },
    editable: 'N',
    require: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BoosterPayableDays',
    },
    'x-layout': {
      //  TODO: 动态layout
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
    max: 999,
    precision: 0,
    min: 0,
  },
};

export { localFieldConfig };