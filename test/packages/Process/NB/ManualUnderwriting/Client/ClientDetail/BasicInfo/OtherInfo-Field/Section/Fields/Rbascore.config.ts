export const fieldConfig = {
  section: 'OtherInfo-Field',
  field: 'rbaScore',
  fieldType: 'Number',
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
      dictTypeCode: 'Label_BIZ_Indiviual',
      dictCode: 'RBAScore',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 34,
      },
    },
  },
};
