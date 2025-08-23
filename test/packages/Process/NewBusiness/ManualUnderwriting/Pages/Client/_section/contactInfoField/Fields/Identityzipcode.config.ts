export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'identityZipCode',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ZipCode',
 },
     expand: 'N',
    required: 'N',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
      // 576px
      sm: {
        span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
      // 768px
      md: {
         span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
      // 992px
      lg: {
         span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
      // 1200px
      xl: {
       span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
      // 1600px
      xxl: {
         span: 4.00,
        offset: 0,
        pull: 0,
        order: 8.00,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_NB_MIBCode',
    },
  },
};
