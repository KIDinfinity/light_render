import { ClaimTypeArray } from 'basic/enum';

const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'otherSignificantCause',
  'field-props': {
    visible: 'C',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Claim Screen Label',
      dictCode: 'OtherSignificantCause',
    },
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimTypeArray' },
          operator: 'intersection',
          right: [
            ClaimTypeArray.Death,
            ClaimTypeArray.OB,
            ClaimTypeArray.SE,
            ClaimTypeArray.AccidentDeath,
          ],
        },
      ],
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };
