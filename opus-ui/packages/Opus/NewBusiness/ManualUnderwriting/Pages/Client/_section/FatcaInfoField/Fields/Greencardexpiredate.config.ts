export const fieldConfig = {
 section: 'FatcaInfo-Field',
  field: 'greenCardExpireDate',
  fieldType: 'Date',
  'field-props': {
     editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ExpiryDate',
    },
     expand: 'Y',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': [],
  },
};