export const fieldConfig = {
  section: 'DividendandICPInfo-Field',
  field: 'bankAcctName',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Accountholder',
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
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
