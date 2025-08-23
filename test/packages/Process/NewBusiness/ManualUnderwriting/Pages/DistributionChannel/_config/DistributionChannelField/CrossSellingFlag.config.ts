export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'crossSellingFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'crossSellingFlag',
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
        order: 28,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 28,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_CrossSelling',
    },
  },
};
