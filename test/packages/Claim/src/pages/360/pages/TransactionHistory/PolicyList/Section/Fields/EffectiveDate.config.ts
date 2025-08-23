export default {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionHsitory',
  field: 'effectiveDate',
  fieldType: 'Date',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'sourceSystem' }, operator: '===', right: 'IL' },
        { left: { domain: 'field', field: 'sourceSystem' }, operator: '===', right: 'LA' },
        { left: { domain: 'field', field: 'sourceSystem' }, operator: 'empty', right: '' },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'EffectiveDate',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};
