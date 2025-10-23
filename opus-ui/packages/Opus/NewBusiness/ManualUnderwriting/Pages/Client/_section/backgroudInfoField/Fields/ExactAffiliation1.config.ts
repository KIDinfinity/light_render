export const fieldConfig = {
  section: 'BackgroundInfo-Field',
  field: 'exactAffiliation1List',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'ExactAffiliation',
    },
    expand: 'N',
    required: 'C',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'industryAffiliation1' }, operator: '===', right: 'Y' },
      ],
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};
