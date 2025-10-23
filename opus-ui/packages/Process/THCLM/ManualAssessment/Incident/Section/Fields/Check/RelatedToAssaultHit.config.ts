
const localFieldConfig = {
  section: 'Incident.Check',
  field: 'assaultRelatedFlag',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RelatedToAssaultHit',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };