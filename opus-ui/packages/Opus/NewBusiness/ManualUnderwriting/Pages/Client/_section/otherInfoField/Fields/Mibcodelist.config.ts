export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'mibCodeList',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'MIBCode',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
      // 576px
      sm: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
      // 768px
      md: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
      // 992px
      lg: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
      // 1200px
      xl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
      // 1600px
      xxl: {
        span: 24.0,
        offset: 0,
        pull: 0,
        order: 24.0,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
