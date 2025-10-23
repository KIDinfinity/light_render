const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Procedure',
  field: 'icuToDate',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'therapiesType' },
          operator: '===',
          right: 'ICU',
        },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.to-date',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
