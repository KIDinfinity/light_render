const localFieldConfig = {
  section: 'ClaimEstimation-Result-Rider',
  field: 'proposedClaimDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'proposedClaimDecision',
    },

    'x-dict': { dictTypeCode: 'Dropdown_CLM_ClaimEstimateDecision' },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
