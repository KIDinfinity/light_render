const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp.klipCaseInfo',
  field: 'klipClaimNo',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'activity',
            field: 'policyId',
          },
          operator: 'not empty',
        },
      ],
    },
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'KLIPClaimNO',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['validateKlipClaimNo'],
  },
};

export { localFieldConfig };
