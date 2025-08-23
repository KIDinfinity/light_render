export const fieldConfig = {
  section: 'CommonClientInfo-Field',
  field: 'entityName',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Entity',
      dictCode: 'EntityName',
    },
    expand: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};
