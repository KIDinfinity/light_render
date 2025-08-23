export const fieldConfig = {
  section: 'BackgroundInfo-Field',
  field: 'exactAffiliation2List',
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
        { left: { domain: 'field', field: 'industryAffiliation2' }, operator: '===', right: 'Y' },
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
        order: 21,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 21,
      },
    },
  },
};
