export const fieldConfig = {
  section: 'UWDecision-Table',
  field: 'payAgePeriod',
  fieldType: '',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: 'payPeriod' }, operator: 'empty', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'PremCessAge',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};
