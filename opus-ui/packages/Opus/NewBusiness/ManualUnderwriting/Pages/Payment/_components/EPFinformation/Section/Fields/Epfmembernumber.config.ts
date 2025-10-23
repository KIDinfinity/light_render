export const fieldConfig = {
  section: 'EPFInformation-Field',
  field: 'epfMemberNumber',
  fieldType: 'Text',
  'field-props': {
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
     label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'EPFMemberNumber',
 },
     expand: 'N',
     visible: 'C',
   'x-layout': {
      // 480px
      xs: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
      // 576px
      sm: {
        span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
      // 768px
      md: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
      // 992px
      lg: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
      // 1200px
      xl: {
       span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
      // 1600px
      xxl: {
         span: 3.00,
        offset: 0,
        pull: 0,
        order: 3.00,
      },
    },
  },
};
