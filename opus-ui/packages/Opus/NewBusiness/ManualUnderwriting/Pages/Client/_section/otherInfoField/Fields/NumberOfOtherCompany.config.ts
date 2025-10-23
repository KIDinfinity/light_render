export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'numberOfOtherCompany',
  fieldType: 'Number',
  'field-props': {
    expand: 'N',
    visible: 'C',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'NumberOfCompany',
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
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
  },
};
