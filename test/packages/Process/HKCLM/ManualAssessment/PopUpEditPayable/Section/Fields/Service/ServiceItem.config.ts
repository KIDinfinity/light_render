
const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'PopUpEditPayable.Service',
  field: 'serviceItem',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.item',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };