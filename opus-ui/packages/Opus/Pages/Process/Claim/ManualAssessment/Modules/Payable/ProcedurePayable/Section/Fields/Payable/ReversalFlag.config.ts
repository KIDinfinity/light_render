const localFieldConfig = {
  section: 'Payable.ProcedurePayable',
  field: 'reversalFlag',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'isReversal',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
      // 576px
      sm: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
      // 768px
      md: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
      // 992px
      lg: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };
