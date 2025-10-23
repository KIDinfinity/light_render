export const fieldConfig = {
  section: 'UWDecision-Table',
  field: 'payPeriod',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: 'payAgePeriod' }, operator: 'empty', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Premiumterm',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
