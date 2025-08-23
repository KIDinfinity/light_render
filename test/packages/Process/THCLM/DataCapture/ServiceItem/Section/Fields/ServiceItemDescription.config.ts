
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ServiceItem',
  field: 'serviceItemDescription',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    maxLength: 240,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'serviceItemDescription',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };