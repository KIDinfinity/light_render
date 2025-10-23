const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ChangeName',
  field: 'firstName',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'FirstName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
