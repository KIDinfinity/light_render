export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'witnessFlag',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'WitnessFlag',
 },
     expand: 'N',
    required: 'Y',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 768px
      md: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 992px
      lg: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 1200px
      xl: {
       span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 1600px
      xxl: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 26,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
