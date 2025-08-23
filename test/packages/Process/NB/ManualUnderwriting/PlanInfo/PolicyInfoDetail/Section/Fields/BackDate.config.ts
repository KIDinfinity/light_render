export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'backDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'isBack' }, operator: '!==', right: 'N' }],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: 'isBack' }, operator: '===', right: 'Y' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'RequiredEffectiveDate',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': [],
  },
};
