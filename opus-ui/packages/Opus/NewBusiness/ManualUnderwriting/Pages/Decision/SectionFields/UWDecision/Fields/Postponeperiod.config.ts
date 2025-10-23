export const fieldConfig = {
  section: 'UWDecision',
  field: 'postponePeriod',
  fieldType: 'Number',
  'field-props': {
    expand: 'Y',
    visible: 'C',
    editable: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'decisionCode' },
          operator: '===',
          right: 'P',
        },
      ],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'PostponePeriod',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
