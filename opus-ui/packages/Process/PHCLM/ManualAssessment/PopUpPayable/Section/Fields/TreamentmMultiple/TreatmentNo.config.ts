const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpPayable.TreamentMultiple',
  field: 'treatmentNo',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 11,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
