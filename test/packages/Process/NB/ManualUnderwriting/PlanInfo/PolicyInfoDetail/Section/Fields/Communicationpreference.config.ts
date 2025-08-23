export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'communicationPreference',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'CommunicationPreference',
 },
     expand: 'Y',
    required: 'Y',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
      // 576px
      sm: {
        span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
      // 768px
      md: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
      // 992px
      lg: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
      // 1200px
      xl: {
       span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
      // 1600px
      xxl: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 35.00,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_CommunicationPreference',
    },
  },
};
