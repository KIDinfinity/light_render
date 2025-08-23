
const localFieldConfig = {
  section: 'Incident.Check',
  field: 'isDrinking',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'trafficAccidentFlag' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RelatedToAlcohol',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
