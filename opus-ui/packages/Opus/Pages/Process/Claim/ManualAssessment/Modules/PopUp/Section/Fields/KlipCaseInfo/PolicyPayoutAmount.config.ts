import { SourceSystem } from 'process/Enum';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.klipCaseInfo',
  field: 'policyPayoutAmount',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'sourceSystem' },
          operator: '===',
          right: SourceSystem.Klip,
        },
      ],
    },
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'policyId',
          },
          operator: 'empty',
        },
      ],
    },
    required: 'N',

    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'policyPayoutAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };
