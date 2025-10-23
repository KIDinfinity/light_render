const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PosRequestInfo',
  field: 'issueEffectiveDate',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.policy-issue-date',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
