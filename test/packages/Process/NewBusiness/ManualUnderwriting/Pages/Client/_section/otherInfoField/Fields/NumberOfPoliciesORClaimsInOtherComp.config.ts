export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'numberOfPoliciesOrClaimsInOtherComp',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'C',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'NumberOfPoliciesOrClaims',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};
