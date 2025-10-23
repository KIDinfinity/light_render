export const fieldConfig = {
  section: 'DividendandICPInfo-Field',
  field: 'bankAcctNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'AccountNo.',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'icpDividendPayType' }, operator: '===', right: 'BTR' },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['VLD_000269'],
  },
};
