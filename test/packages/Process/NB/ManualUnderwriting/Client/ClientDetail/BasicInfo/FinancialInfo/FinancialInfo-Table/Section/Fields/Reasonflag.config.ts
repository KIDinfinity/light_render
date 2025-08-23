export const fieldConfig = {
  section: 'FinancialInfo-Table',
  field: 'reasonFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ReasonforNoTIN',
    },
    expand: 'N',
    required: 'N',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'ctfCountryCode' },
          operator: 'empty',
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
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_IND_ReasonforNoTIN',
    },
  },
};
