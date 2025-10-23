const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ServicingRequestInfo',
  field: 'declineReason',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'decision' }, operator: '!==', right: 'D' }],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'decision' }, operator: '===', right: 'D' }],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_SRV',
      dictCode: 'DeclineReason',
    },
    'x-dict': { dictTypeCode: 'Dropdown_SRV_DeclineReason' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
