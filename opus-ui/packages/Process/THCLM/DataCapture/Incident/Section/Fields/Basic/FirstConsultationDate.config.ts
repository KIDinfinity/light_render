
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Incident.Basic',
  field: 'firstConsultationDate',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'FirstConsultationDate',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };