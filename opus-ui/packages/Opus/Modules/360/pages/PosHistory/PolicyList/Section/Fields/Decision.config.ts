export default {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TransactionHsitory',
  field: 'decision',
  fieldType: 'Dropdown',
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
      dictCode: 'Decision',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-dict': { dictTypeCode: 'Dropdown_POS_UW_Decision' },
  },
};
