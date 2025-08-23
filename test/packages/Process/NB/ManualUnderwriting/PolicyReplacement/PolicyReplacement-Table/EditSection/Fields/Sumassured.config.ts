export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'sumAssured',
  fieldType: 'number',
  'field-props': {
    expand: 'N',
    visible: 'Y',
    editable: 'Y',
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
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'SumAssured',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};
