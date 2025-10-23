export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'otherContract',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'OtherContract',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
