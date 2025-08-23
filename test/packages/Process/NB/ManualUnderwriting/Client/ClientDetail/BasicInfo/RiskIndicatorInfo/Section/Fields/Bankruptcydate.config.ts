export const fieldConfig = {
  section: 'RiskIndicatorInfo',
  field: 'bankruptcyDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'Bankruptcy' }, operator: '===', right: '1' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'DateofBankruptcy',
    },
    expand: 'Y',
    visible: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': [],
  },
};
