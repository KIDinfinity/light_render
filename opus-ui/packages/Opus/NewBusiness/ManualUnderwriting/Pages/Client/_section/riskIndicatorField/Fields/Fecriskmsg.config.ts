export const fieldConfig = {
  section: 'RiskIndicator-Field',
  field: 'fecRiskMsg',
  fieldType: 'Text',
  'field-props': {
    expand: 'Y',
    visible: 'Y',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'MaxScoreOnList',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};
