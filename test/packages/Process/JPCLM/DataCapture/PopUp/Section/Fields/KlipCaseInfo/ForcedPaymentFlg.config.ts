import { SourceSystem } from 'process/Enum';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp.klipCaseInfo',
  field: 'forcedPaymentFlg',
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
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ForcedPaymentFlag',
    },

    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_ForcedPayment',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };
