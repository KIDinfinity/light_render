export const fieldConfig = {
  section: 'UWDecision-Table',
  field: 'indemnifyAgePeriod',
  fieldType: '',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: '', field: 'indemnifyPeriod' }, operator: 'empty', right: '' },
      ],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'UptoAge',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};
