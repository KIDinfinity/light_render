export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'ctfExpireDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ExpiryDate',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'ctfType' },
          operator: '!==',
          right: undefined,
        },
        {
          left: { domain: '', field: 'ctfType' },
          operator: '!==',
          right: null,
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 28,
      },
    },
    'x-rules': [],
  },
};
