export const fieldConfig = {
  section: 'DistributionChannel-Field',
  field: 'crossSelling',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'CrossSelling',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 21,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_CrossSelling',
    },
  },
};
