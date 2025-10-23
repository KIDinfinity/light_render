const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'partOfBodyInjuredArray',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.post-of-body-injured',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
