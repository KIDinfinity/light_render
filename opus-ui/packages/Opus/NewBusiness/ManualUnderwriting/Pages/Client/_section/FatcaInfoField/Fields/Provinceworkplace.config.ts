export const fieldConfig = {
  section: 'FatcaInfo-Field',
  field: 'provinceWorkPlace',
  fieldType: 'Text',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ProvinceWorkPlace',
 },
     expand: 'Y',
     visible: 'Y',
   'x-layout': {
      // 480px
      xs: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};
