const localFieldConfig = {
  section: 'ServiceItemPayable',
  field: 'benefitTypeCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-type',
    },
    'x-dict': { dictCode: 'benefitTypeCode', dictName: 'benefitTypeName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };
