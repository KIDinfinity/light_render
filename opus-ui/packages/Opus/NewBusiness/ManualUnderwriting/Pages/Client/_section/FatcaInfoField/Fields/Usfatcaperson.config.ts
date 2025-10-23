export const fieldConfig = {
  section: 'FatcaInfo-Field',
  field: 'usFatcaPerson',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'USFATCAPerson',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
