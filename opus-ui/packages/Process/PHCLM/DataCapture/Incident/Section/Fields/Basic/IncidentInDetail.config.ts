const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'incidentInDetail',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.detail-description-of-incident',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
