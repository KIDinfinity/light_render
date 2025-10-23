const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee',
  field: 'surname',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Surname',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
