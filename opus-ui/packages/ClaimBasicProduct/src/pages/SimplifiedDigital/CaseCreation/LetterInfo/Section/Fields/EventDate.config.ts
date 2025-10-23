const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'letterInfo',
  field: 'eventDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'EventDate',
    },
    maxLength: 20,
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 6,
        pull: 6,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
