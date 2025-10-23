const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'JPAC',
  field: 'fromDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    dateFormat: 'L',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'therapeuticDate',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
