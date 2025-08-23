export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'sourceFundOtherReason',
  fieldType: 'Date',
  'field-props': {
    editable: 'C',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'sourceFund' },
          operator: '===',
          right: 'OT',
        },
      ],
    },
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'sourceFund' },
          operator: '===',
          right: 'OT',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'SourceFundOtherReason',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 24,
      },
    },
    'x-rules': [],
  },
};
