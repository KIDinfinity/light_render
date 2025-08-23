export const fieldConfig = {
  section: 'FinancialInfo-Table',
  field: 'reason',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'SpecifyReason',
    },
    expand: 'N',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'ctfCountryCode' },
          operator: 'not empty',
        },
        {
          left: { domain: 'field', field: 'ctfId' },
          operator: 'empty',
        },
      ],
    },
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
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};
