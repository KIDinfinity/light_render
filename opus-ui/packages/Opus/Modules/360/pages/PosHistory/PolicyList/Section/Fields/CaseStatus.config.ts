export default {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionHsitory',
  field: 'caseStatus',
  fieldType: 'Label',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'sourceSystem' }, operator: '===', right: 'Opus' },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'caseStatus',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': { dictTypeCode: 'Label_BPM_TaskActivity' },
  },
};
