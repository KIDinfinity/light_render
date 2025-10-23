const localFieldConfig = {
  atomGroupCode: 'BP_POS_CTG006.BP_POS_ACT002',
  caseCategory: 'BP_POS_CTG006',
  activityCode: 'BP_POS_ACT002',
  section: 'PolicyInfo',
  field: 'highlight',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Highlight',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_YN' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
