export const fieldConfig = {
  section: 'Exclusion-Field',
  field: 'exclusionUwDecisionReason',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'ExclusionUWDecisionReason',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_NB_ExclusionUWDecisionReason',
    },
  },
};
