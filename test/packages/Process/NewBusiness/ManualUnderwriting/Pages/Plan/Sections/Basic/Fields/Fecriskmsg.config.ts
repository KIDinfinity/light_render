export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'fecRiskMsg',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'fecRiskLevel',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
      // 576px
      sm: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
      // 768px
      md: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
      // 992px
      lg: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
      // 1200px
      xl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
      // 1600px
      xxl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 47.0,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
