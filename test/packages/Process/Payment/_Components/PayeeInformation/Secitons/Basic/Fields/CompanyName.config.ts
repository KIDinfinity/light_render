const localFieldConfig = {
  section: 'payee.Basic',
  field: 'companyName',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_COM_ReportCenter',
      dictCode: 'company_name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 10,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
