export const fieldConfig = {
  section: 'FinancialInfo-Table',
  field: 'additionalReason',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'SpecifyReason',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: '',
            field: 'ctfType',
          },
          operator: '===',
          right: 'TN',
        },
        {
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
      ],
    },
    required: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};
