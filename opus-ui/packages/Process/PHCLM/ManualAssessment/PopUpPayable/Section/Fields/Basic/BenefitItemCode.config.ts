
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUpPayable.Basic',
  field: 'benefitItemCode',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
    },
    'x-dict': { dictCode: 'benefitItemCode', dictName: 'benefitItemName' },
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
  },
};

export { localFieldConfig };