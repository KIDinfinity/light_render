const localFieldConfig = {
  section: 'InformationModal',
  field: 'teamOrUser',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'reason',
          },
          operator: '===',
          right: 'GEPR',
        },
        {
          left: {
            domain: 'field',
            field: 'reason',
          },
          operator: '===',
          right: 'GIPR',
        },
        {
          left: {
            domain: 'field',
            field: 'reason',
          },
          operator: '===',
          right: 'GAD',
        },
        {
          left: {
            domain: 'field',
            field: 'reason',
          },
          operator: '===',
          right: 'GSO',
        },
      ],
    },
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'SelectTeamUser',
    },
    'x-layout': {
      // 480px
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
