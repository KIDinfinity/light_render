export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'tinsssgsisNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: 'tinsssgsis' }, operator: 'not empty', right: '' }],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'TINSSSGSISNo',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};
