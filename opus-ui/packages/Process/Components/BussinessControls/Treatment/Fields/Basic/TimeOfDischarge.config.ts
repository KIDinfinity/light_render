const localFieldConfig = {
  section: 'Treatment.Basic',
  field: 'TimeOfDischarge',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'IP',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'treatmentType' },
          operator: '===',
          right: 'IP',
        },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TimeOfDischarge',
    },
    name: 'dateOfDischarge',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
