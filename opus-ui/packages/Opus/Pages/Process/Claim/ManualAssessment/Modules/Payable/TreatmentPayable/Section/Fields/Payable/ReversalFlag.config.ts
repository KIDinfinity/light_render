const localFieldConfig = {
  section: 'Payable.TreatmentPayable',
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
        order: 13,
      },
      // 576px
      sm: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 13,
      },
      // 768px
      md: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 13,
      },
      // 992px
      lg: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 13,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 4,
        pull: 4,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };
