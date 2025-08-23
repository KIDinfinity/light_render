export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'otherPassionSurvey',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'OtherPassionSurvey',
    },
    expand: 'N',
    required: 'C',
    visible: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'FIELD', field: 'passionSurvey' },
          operator: '===',
          right: 'OT',
        },
      ],
    },
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'FIELD', field: 'passionSurvey' },
          operator: '===',
          right: 'OT',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};
