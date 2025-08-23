export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'agentBlacklist',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'agentBlacklist',
    },
    expand: 'Y',
    required: 'N',
    visible: 'C',
    visible_condition: {
      combine: '&&',
      conditions: [{ left: '$agentChannelCode', operator: 'in', right: ['AGENCY'] }],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 27,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
