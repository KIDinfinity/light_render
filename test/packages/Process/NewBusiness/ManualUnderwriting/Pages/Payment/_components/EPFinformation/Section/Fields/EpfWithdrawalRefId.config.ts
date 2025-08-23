export const fieldConfig = {
  section: 'EPFInformation-Field',
  field: 'epfWithdrawalRefId',
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
      dictCode: 'EPFWithdrawalRefID',
 },
     expand: 'N',
     visible: 'C',
   'x-layout': {
      // 480px
      xs: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
       span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
         span: 3,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};
