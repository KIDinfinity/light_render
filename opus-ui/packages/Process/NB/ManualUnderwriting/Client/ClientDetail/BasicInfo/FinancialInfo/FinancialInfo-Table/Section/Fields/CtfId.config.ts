export const fieldConfig = {
  section: 'FinancialInfo-Table',
  field: 'ctfId',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'TINNo',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'ctfCountryCode' },
          operator: 'not empty',
        },
        {
          left: { domain: '', field: 'country' },
          operator: 'not empty',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'ctfCountryCode' },
          operator: 'not empty',
        },
        {
          left: { domain: 'field', field: 'reason' },
          operator: 'empty',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};
