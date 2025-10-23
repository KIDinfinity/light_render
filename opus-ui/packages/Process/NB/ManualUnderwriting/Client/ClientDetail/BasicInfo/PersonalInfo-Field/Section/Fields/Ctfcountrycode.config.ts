export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'ctfPlace',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'CountryCode',
    },
    expand: 'N',
    required: 'N',
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
        order: 29,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 29,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 29,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Country',
    },
  },
};
