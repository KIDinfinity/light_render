export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'survivalBenefitOption',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'SurvivalBenefitOption',
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
        order: 36,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 36,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 36,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 36,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 36,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 36,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_SurvivalBenefitOption',
    },
  },
};
