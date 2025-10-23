export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'share',
  fieldType: 'Number',
  'field-props': {
    expand: 'Y',
    visible: 'Y',
    editable: 'N',
    required: '',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BenefitPercentage',
    },
    'editable-condition': {
      conditions: [
        {
          left: {
            field: 'beneficiaryType',
            domain: 'field',
          },
          right: 'TB',
          operator: '!==',
        },
      ],
      combine: '&&',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
    'x-rules': ['VLD_000715', 'VLD_000716'],
  },
};
