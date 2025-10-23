const localFieldConfig = {
  section: 'Treatment.Basic',
  field: 'TimeOfConsultation',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
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
          right: 'OP',
        },
      ],
    },
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TimeOfConsultation',
    },
    name: 'dateOfConsultation',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
