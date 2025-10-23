export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'remoteSelling',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'RemoteSelling',
 },
     expand: 'Y',
    required: 'Y',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
         span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
         span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
       span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
         span: 25,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
