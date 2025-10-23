const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee-User',
  field: 'otherRelationship',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      conditions: [
        {
          left: {
            field: 'relationship',
            domain: 'field',
          },
          right: '019',
          operator: '===',
        },
      ],
      combine: '&&',
    },
    editable: 'Y',
    required: 'Y',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'OtherRelationship',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
