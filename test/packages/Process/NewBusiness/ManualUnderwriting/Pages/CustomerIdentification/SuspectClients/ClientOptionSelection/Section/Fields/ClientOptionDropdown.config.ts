const localFieldConfig = {
  section: 'ClientOption-Fields',
  field: 'updateClientOption',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_COM_General',
      dictCode: 'existClientUpdateOption',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_NB_UpdateClientOpt',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
  },
};

export { localFieldConfig };
