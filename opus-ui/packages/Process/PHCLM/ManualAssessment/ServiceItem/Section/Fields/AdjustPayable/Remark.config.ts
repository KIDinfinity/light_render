
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'AdjustService',
  field: 'remark',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'adjRemark',
    },
    maxLength: 240,
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 1,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
