import { ClaimTypeArray } from 'basic/enum';
const localFieldConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident.Basic',
  field: 'dateTimeOfDeath',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimTypeArray' },
          operator: 'intersection',
          right: [
            ClaimTypeArray.Death,
            ClaimTypeArray.Crisis,
            ClaimTypeArray.CodeNameMajor,
            ClaimTypeArray.GriefCounsellingMajor,
            ClaimTypeArray.W6WOPDSRLSCIMajor,
            ClaimTypeArray.W5WOPDSRESCIMajor,
            ClaimTypeArray.W4WOPDSRCIMajor,
            ClaimTypeArray.W2WOPDSRTPDMajor,
            ClaimTypeArray.W1WOPDSRDeathMajor,
            ClaimTypeArray.TotalandPermanentDisabilityMajor,
            ClaimTypeArray.TerminalIllnessMajor,
            ClaimTypeArray.DeathCompensationMajor,
            ClaimTypeArray.MajorCriticalIllnessMajor,
            ClaimTypeArray.MinorCriticalIllnessMajor,
            ClaimTypeArray.BereavementDonationMajor,
            ClaimTypeArray.BereavementClaimMajor,
            ClaimTypeArray.AccidentPermanentMajor,
            ClaimTypeArray.AccidentDeathMajor,
            ClaimTypeArray.MedicalClaimMinor,
            ClaimTypeArray.InfectiousDiseaseMinor,
            ClaimTypeArray.HospitalisedMinor,
          ],
        },
      ],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DateOfDeath',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    // 'x-rules': ['VLD_000607', 'VLD_000607_incidentDate'],
  },
};

export { localFieldConfig };
