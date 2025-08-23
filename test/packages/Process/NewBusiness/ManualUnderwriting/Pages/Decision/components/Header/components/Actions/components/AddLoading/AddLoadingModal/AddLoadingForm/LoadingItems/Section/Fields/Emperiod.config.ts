export const fieldConfig = {
  section: 'Loading-Field',
  field: 'emPeriod',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'EMPeriod',
    },
    expand: 'Y',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'extraMortality' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'extraMortality' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 576px
      sm: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 768px
      md: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 992px
      lg: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1200px
      xl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1600px
      xxl: {
        span: 3.0,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
    },
    'add-loading-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3.0,
      },
    },
  },
};
