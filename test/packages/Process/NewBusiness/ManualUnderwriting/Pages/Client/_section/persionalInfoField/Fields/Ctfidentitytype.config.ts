export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'ctfType',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'IDType',
    },
    expand: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'ctfType' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfId' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfExpireDate' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfPlace' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 26,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_IdentityType',
    },
  },
};
