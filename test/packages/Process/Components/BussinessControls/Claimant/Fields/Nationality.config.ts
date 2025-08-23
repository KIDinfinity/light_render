const localFieldConfig = {
  section: 'Claimant',
  field: 'nationality',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.nationality',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Country',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
  },
};

export { localFieldConfig };
