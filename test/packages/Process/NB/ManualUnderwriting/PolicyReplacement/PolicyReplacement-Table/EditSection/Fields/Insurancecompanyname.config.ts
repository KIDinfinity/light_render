export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'insuranceCompanyName',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'InsuranceCompany',
    },
    expand: 'N',
    visible: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'insuredSeqNo' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
