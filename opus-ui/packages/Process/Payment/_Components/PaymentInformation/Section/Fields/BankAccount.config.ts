
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'paymentMethod',
  field: 'bankAccountNo',
  'field-props': {
    visible: 'C',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.bank-account-no',
    },
    maxLength: 20,
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
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
