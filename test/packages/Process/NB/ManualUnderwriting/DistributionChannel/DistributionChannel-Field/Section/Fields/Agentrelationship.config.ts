export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'agentRelationship',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'AgentRelationship',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_Relationship',
    },
  },
};
