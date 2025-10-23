export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'rpqScore',
  fieldType: 'Number',
  'field-props': {
     expand: 'Y',
     visible: 'Y',
     editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
     label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'RPQScore',
 },
    'x-layout': {
      // 480px
      xs: {
         span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
         span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
         span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
       span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
         span: 26,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};