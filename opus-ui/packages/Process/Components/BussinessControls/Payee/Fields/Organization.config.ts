const localFieldConfig = {
  section: 'payee',
  field: 'organization',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'O',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.is-corporation',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
