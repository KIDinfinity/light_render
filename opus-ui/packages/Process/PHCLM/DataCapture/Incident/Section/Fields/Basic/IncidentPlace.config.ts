const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'incidentPlace',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.place-of-incident',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
