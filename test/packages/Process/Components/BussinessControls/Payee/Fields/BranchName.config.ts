const localFieldConfig = {
  section: 'payee',
  field: 'branchName',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BranchName',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};

export { localFieldConfig };
