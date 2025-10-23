const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'roomType',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'roomType',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_RoomType' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };
