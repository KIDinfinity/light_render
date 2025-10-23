
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'AdjustTreatmentPayable',
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
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 2,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
