
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Claimant',
  field: 'phoneNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.usermanagement.basicInfo.label.phone-no',
    },
    maxLength: 20,
    expand: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };