
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Claimant',
  field: 'relationshipWithInsured',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.relationship-width-insured',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_RelationshipWithInsured' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 18,
        pull: 18,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };
