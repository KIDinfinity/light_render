const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Nominee-Occupation',
  field: 'natureOfBusiness',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'NatureofBusiness',
    },
    'x-dict': { dictTypeCode: 'Dropdown_IND_NatureofBusiness' },
    'x-layout': {
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
