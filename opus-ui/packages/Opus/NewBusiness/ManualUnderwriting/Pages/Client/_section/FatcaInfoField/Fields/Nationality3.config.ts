export const fieldConfig = {
  section: 'FatcaInfo-Field',
  field: 'nationality3',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Nationality3',
 },
     expand: 'Y',
    required: 'N',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-dict': {
      dictTypeCode: 'misc_dict_nationality',
    },
  },
};
