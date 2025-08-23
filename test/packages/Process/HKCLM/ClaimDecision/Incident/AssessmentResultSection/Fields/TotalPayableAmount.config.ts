
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'ClaimResult',
  field: 'totalPayableAmount',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TotalPayoutAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 6,
        pull: 0,
        order: 1,
      },
    },
  },
};

const inquiryLayout = {
  // 480px
    xs: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
  // 576px
  sm: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
  // 768px
  md: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
  // 992px
  lg: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
  // 1200px
  xl: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
  // 1600px
  xxl: {
    span: 6,
    offset: 3,
    pull: 0,
    order: 1,
  },
}

export { localFieldConfig, inquiryLayout };
