const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'FreelookCancellation',
  field: 'cancelReasonCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_POS',
      dictCode: 'SurrenderReason',
    },
    'x-dict': { dictTypeCode: 'Dropdown_SRV_SurrenderReason' },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': [''],
  },
};

export { localFieldConfig };
