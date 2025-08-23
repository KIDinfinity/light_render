export const fieldConfig = {
  section: 'RiskIndicatorInfo',
  field: 'alertId',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'NSSAlert',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 576px
      sm: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 768px
      md: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 992px
      lg: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 1200px
      xl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
      // 1600px
      xxl: {
        span: 4.0,
        offset: 0,
        pull: 0,
        order: 1.0,
      },
    },
  },
};
