export const fieldConfig = {
  section: 'MIBInformation-Table',
  field: 'clientId',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ClientName',
    },
    expand: 'N',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
