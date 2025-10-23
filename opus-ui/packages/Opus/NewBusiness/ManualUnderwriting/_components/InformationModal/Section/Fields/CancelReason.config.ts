const localFieldConfig = {
  section: 'InformationModal',
  field: 'cancelReason',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_COM_General',
      dictCode: 'cancelReason',
    },
    'x-dict': { dictTypeCode: 'Dropdown_INF_CancelReason' },
    'x-layout': {
      // 480px$
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': [''],
  },
};

export { localFieldConfig };
