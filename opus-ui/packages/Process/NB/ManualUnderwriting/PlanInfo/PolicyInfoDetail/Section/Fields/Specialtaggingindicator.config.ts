export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'specialTaggingIndicator',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'SpecialTaggingIndicator',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 41,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_SpecialTaggingIndicator',
    },
  },
};
