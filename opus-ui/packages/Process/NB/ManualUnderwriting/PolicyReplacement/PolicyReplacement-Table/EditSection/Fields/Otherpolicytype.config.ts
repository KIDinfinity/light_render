export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'otherPolicyType',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'OtherPolicyType',
    },
    expand: 'Y',
    visible: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'policyType' },
          operator: '===',
          right: 'Others',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};
