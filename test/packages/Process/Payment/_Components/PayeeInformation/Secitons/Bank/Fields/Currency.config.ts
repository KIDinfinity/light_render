const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'bankAccount',
  field: 'currencyCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.currency',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CFG_Currency' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
