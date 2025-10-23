export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'expiryDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ExpiryDate',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'identityType' },
          operator: 'in',
          right: ['MT', 'OT', 'PP', 'CT'],
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};
