export const fieldConfig = {
  section: 'RiskIndicatorInfo',
  field: 'fecRiskMsgCRR',
  fieldType: 'Text',
  'field-props': {
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CRRUniqueIdentifier',
 },
     expand: 'Y',
     visible: 'C',
   'x-layout': {
      // 480px
      xs: {
         span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
         span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
         span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
       span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
         span: 10,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },
  },
};
