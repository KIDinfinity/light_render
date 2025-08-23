const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'RequestInfo',
  field: 'editDeclineReason',
  'field-props': {
    visible: 'C',
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        { left: { domain: 'field', field: 'decision' }, operator: '===', right: 'D' },
        { left: { domain: 'field', field: 'declineReason' }, operator: '===', right: '999' },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        { left: { domain: 'field', field: 'decision' }, operator: '===', right: 'D' },
        { left: { domain: 'field', field: 'declineReason' }, operator: '===', right: '999' },
      ],
    },
    'visible-condition': {
      combine: '&&',
      conditions: [
        { left: { domain: 'field', field: 'decision' }, operator: '===', right: 'D' },
        { left: { domain: 'field', field: 'declineReason' }, operator: '===', right: '999' },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_SRV',
      dictCode: 'EditDeclineReason',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
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
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
