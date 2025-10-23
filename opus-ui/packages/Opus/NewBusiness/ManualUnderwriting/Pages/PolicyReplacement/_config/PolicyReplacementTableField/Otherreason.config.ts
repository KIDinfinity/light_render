export const fieldConfig = {
  section: 'PolicyReplacement-Table',
  field: 'otherReason',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'OtherReasonForPolicyReplacement',
    },
    expand: 'Y',
    visible: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'reasonForPolicyReplacement' },
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
        order: 7,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};
