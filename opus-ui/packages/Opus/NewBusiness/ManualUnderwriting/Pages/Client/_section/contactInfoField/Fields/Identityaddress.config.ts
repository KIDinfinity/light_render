export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'identityAddress',
  fieldType: 'Text',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'identityAddress',
 },
     expand: 'N',
     visible: 'Y',
   'x-layout': {
      // 480px
      xs: {
         span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
      // 576px
      sm: {
        span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
      // 768px
      md: {
         span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
      // 992px
      lg: {
         span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
      // 1200px
      xl: {
       span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
      // 1600px
      xxl: {
         span: 12.00,
        offset: 0,
        pull: 0,
        order: 7.00,
      },
    },
  },
};
