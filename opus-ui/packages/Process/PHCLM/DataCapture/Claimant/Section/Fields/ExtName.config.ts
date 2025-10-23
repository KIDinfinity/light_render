const localFieldConfig = {
  section: 'Claimant',
  field: 'extName',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.ext-name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
