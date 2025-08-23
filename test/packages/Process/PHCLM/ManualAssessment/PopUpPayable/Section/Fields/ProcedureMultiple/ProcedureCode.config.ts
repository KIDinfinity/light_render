
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable.ProcedureMultiple',
  field: 'procedureCode',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.procedure-code',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
