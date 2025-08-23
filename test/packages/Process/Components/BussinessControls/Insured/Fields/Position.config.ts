import { Combine, Domain, Operator } from 'basic/components/Form/constants';
const localFieldConfig = {
  section: 'Insured',
  field: 'position',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: Combine.AND,
      conditions: [
        {
          left: { domain: Domain.ACTIVITY, dataPath: 'claimProcessData.insured.policySource' },
          operator: Operator.IN,
          right: ['G'],
        },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.usermanagement.basicInfo.label.organization.position',
    },
    maxLength: 20,
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};

export { localFieldConfig };
