export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'ctfStartDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'StartDate',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'FIELD', field: 'identityType' },
          operator: 'in',
          right: ['BC', 'ID'],
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'x-rules': [],
  },
};
