const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'SummaryPayable',
  field: 'productCode',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimDecision' },
          operator: '===',
          right: 'N',
        },
      ],
    },
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ProductCode',
    },
    'x-dict': { dictCode: 'coreProductCode', dictName: 'productName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-layout-isLabel': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };
