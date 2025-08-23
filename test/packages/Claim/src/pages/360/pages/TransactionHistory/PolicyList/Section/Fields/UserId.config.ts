export default {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionHsitory',
  field: 'userId',
  fieldType: 'Text',
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
      dictCode: 'userId',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};
