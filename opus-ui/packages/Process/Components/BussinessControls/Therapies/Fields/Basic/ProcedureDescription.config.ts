const localFieldConfig = {
  section: 'Procedure',
  field: 'procedureDescription',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ProcedureDescription',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    maxLength: 240,
  },
};

export { localFieldConfig };
