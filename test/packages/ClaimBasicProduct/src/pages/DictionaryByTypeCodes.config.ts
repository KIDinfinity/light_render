import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';

const defaultMap: string[] = [
  'Gender',
  'IdentityType',
  'OrganizationIdentityType',
  'InsuredState',
  'Relationship',
  'ClaimType',
  'CauseOfIncident',
  'TreatmentType',
  'PayeeType',
  'DiagnosisType',
  'PaymentMethod',
];

const assessmentDictionary = [
  ...defaultMap,
  'Dropdown_CLM_ClaimDecision',
  'Dropdown_CLM_AssessmentDecision',
  'Dropdown_CLM_ExGratiaCode',
  'AmountType',
  'PolicyType',
  'PayablesType',
];

export default {
  [CaseCategory.Claim_Request]: {
    [TaskDefKey.dataCapture]: [...defaultMap, 'Dropdown_COM_SubmissionChannel'],
    [TaskDefKey.manualAssessment]: assessmentDictionary,
    [TaskDefKey.qualityControl]: [...defaultMap, 'Dropdown_COM_SubmissionChannel'],
    [TaskDefKey.claimApproval]: assessmentDictionary,
    history: assessmentDictionary,
  },
};
