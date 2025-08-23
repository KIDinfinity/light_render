export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'replacedPolicyId',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
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
      dictCode: 'PolicyNo',
    },
    expand: 'N',
    visible: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};
