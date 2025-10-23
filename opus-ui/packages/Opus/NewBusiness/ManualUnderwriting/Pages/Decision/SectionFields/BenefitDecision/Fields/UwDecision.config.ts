export const fieldConfig = {
  section: 'BenefitDecision',
  field: 'uwDecision',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'BenefitLevelDecision',
    },
    expand: 'Y',
    editable: 'C',
    required: 'C',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_UW_BenefitDecision',
    },
  },
};
