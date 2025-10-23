export const fieldConfig = {
  section: 'FinancialInfo-Field',
  field: 'ctfId',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'IDNo',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'ctfType' },
          operator: '===',
          right: 'TN',
        }
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};
