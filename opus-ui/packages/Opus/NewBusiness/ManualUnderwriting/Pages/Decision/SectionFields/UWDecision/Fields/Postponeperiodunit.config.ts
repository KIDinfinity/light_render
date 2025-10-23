export const fieldConfig = {
  section: 'UWDecision',
  field: 'postponePeriodUnit',
  fieldType: 'Dropdown',
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
      dictCode: 'PostponePeriodUnit',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};
