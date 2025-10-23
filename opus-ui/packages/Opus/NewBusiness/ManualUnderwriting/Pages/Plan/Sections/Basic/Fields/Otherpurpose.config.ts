export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'otherPurpose',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'purposeOfInsurance' },
          operator: '===',
          right: 'OT',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'OtherPurpose',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 22,
      },
    },
  },
};
