export const fieldConfig = {
  section: 'Loading-Field',
  field: 'fmPeriod',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'FMPeriod',
    },
    expand: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'flatMortality' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'flatMortality' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 52,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
