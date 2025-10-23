
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'InvoicePopUp.Service',
  field: 'serviceItem',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.item',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };