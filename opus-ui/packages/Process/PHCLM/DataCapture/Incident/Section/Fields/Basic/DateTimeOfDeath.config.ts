const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'dateTimeOfDeath',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DateOfDeath',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    // 'x-rules': ['VLD_000607', 'VLD_000607_incidentDate'],
  },
};

export { localFieldConfig };
