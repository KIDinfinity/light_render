const localFieldConfig = {
  section: 'Payable_ClaimPayable',
  field: 'detailedAssessmentDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_COM_ReportCenter',
      dictCode: 'assessment_result',
    },
    'x-dict': { dictCode: 'dictCode', dictName: 'dictName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
