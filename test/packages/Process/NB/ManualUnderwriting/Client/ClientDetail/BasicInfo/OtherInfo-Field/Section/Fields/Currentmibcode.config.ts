export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'currentMibCodeList',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'UWMeMIBCode',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_NB_MIBCode',
    },
  },
};
