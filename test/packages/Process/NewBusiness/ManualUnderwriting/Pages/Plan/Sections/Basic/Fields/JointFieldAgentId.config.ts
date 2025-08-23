export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'jointFieldAgentId',
  fieldType: 'Text',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    maxLength: 0,
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'JointFieldAgentID',
      type: null,
    },
    layouts: null,
    'editable-condition': null,
    'visible-condition': {
      conditions: [
        {
          left: {
            field: 'gioCampaignCode',
            domain: 'field',
          },
          right: 'JWF',
          operator: '===',
        },
      ],
      combine: '||',
    },
    'required-condition': null,
    'x-rules': null,
    'x-layout': {
      xs: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
      sm: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
      md: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
      lg: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
      xl: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
      xxl: {
        span: 3.0,
        offset: 0.0,
        pull: 0.0,
        order: 38.0,
      },
    },
    'x-dict': {
      dictTypeCode: null,
    },
  },
};
