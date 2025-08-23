export default {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionHsitory',
  field: 'submissionChannel',
  fieldType: 'Dropdown',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'sourceSystem' }, operator: '===', right: 'Opus' },
        { left: { domain: 'field', field: 'sourceSystem' }, operator: '===', right: 'workQueue' },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SubmissionChannel',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_SubmissionChannel' },
  },
};
