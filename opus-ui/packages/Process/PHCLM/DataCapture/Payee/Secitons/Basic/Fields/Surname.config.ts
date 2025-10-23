
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payeeBasic',
  field: 'surname',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.surname',
    },
    maxLength: 30,
    'x-layout': {
      // 480px
      xs: {
        span: 24,
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
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
