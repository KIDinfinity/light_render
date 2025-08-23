export const fieldConfig = {
  section: 'ContactInfo-Field',
  field: 'contactNo',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'contactType' },
          operator: '!==',
          right: undefined,
        },
        {
          left: { domain: '', field: 'contactType' },
          operator: '!==',
          right: null,
        },
      ],
    },
    editable: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'contactNo' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'contactType' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'countryCode' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ContactNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};
