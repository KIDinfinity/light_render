const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'DocumentItem',
  field: 'receivedDate',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    dateFormat: 'YYYY/MM/DD HH:mm:ss',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'ReceiveDateTime',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };
