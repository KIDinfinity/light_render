export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'IndexingInformation',
  field: 'applicationNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'type'
          },
          operator: '===',
          right: 'PendingDocument'
        }
      ]
    },
    label: {
      dictTypeCode: 'Label_COM_ReportCenter',
      dictCode: 'bs_application_no',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 586px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 868px
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
