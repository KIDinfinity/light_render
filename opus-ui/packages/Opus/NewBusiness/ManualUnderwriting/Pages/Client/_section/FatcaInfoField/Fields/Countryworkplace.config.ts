export const fieldConfig = {
  section: 'FatcaInfo-Field',
  field: 'countryWorkPlace',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CountryWorkPlace',
 },
     expand: 'Y',
    required: 'C',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: 'cfg_address where address_line =&#39;Address line 7 (Country)&#39;',
    },
  },
};
