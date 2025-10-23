export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'crossReferenceNumber',
  fieldType: 'Text',
  'field-props': {
    expand: 'Y',
    visible: 'Y',
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'crossReferenceNumber',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 64,
      },
    },
  },
};
