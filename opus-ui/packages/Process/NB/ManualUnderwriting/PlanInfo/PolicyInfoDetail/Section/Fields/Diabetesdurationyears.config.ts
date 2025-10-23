export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'diabetesDurationYears',
  fieldType: 'Number',
  'field-props': {
    expand: 'Y',
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'DurationOfDiabetes',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 42,
      },
    },
  },
};
