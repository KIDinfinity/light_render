export const fieldConfig = {
  section: 'UWDecision',
  field: 'postponeRemark',
  'field-props': {
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
      dictCode: 'PostponeRemark',
    },
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
    'visible-condition': {},
  },
};
