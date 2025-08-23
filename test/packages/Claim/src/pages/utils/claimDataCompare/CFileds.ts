import { tenant, Region } from '@/components/Tenant';
import { ECompareModule } from './ECompareModule';

const initialData = () => {
  return tenant.region({
    [Region.JP]: {
      [ECompareModule.Incident]: [
        // 'causeOfIncident',
        'claimTypeArray',
        'editDate',
        'firstConsultationDate',
        'identificationDate',
        // 'incidentDate',
        'incidentInDetail',
        'incidentPlace',
        'laborConstrainedOfAmi',
        'medicalCertificateDate',
        'partOfBodyInjuredArray',
        'reportToThePolice',
        'requiringNursingDate',
        'sequelaeOfStroke',
        'trafficAccidentFlag',
        'isDrinking',
        'behaviorInAccident',
        'selfJudgmentAbility',
      ],
      [ECompareModule.Treatment]: [
        // 'dateOfAdmission',
        // 'dateOfDischarge',
        'department',
        'doctor',
        'icu',
        'icuFromDate',
        'icuToDate',
        'isDischarged',
        'medicalProvider',
        'medicalProviderDescription',
        'hospitalizationInstructionDate',
        'dateOfConsultation',
        'treatmentType',
        'hospitalizationFlg',
        'hospitalizationSequentialNo',
      ],
      [ECompareModule.Diagnosis]: [
        'criticalIllness',
        'criticalIllnessName',
        // 'diagnosisCode',
        'diagnosisDate',
        'diagnosisDescription',
        'diagnosisName',
        // 'diagnosisType',
        'firstSymptomDate',
        'symptomDate',
        'diagnosisNo',
        'relationshipCode',
      ],
      [ECompareModule.Procedure]: [
        'kjCode',
        'operationDate',
        'procedureCode',
        'procedureDescription',
        'procedureName',
        'surgeryInstructionDate',
      ],
      [ECompareModule.OtherProcedure]: [
        'fromDate',
        'toDate',
        'otherRadiationNames',
        'irradiationContent',
        'radiationContent',
        'radiationCategory',
      ],
      [ECompareModule.Invoice]: [],
      [ECompareModule.Service]: [
        'expense',
        'fromDate',
        'toDate',
        'advancedMedicalCN',
        'advancedMedicalApprovalDate',
        'advancedSurgeryDate',
      ],
    },
    [Region.HK]: {
      [ECompareModule.Incident]: ['causeOfIncident', 'incidentDate'],
      [ECompareModule.Treatment]: [
        'treatmentType',
        'dateOfConsultation',
        'dateOfAdmission',
        'dateOfDischarge',
      ],
      [ECompareModule.Diagnosis]: ['diagnosisCode'],
      [ECompareModule.Procedure]: ['operationDate'],
    },
    [Region.TH]: {
      [ECompareModule.Incident]: ['claimType', 'causeOfIncident', 'incidentDate'],
      [ECompareModule.Treatment]: [
        'icu',
        'dateOfAdmission',
        'dateOfDischarge',
        'dateOfConsultation',
      ],
      [ECompareModule.Diagnosis]: ['diagnosisCode', 'diagnosisType'],
      [ECompareModule.Procedure]: ['reimbursementPercentage', 'operationDate'],
      [ECompareModule.Invoice]: ['invoiceDate'],
      [ECompareModule.Service]: ['serviceItem', 'expense', 'unit', 'orderNum'],
      [ECompareModule.FollowUp]: ['inquiryClaimNo', 'relatedInquiryClaimNo', 'relationType'],
      [ECompareModule.Insured]: ['identityType', 'identityNo'],
      [ECompareModule.MainBenefit]: ['mainBenefit'],
    },
    notMatch: {},
  });
};

const fields = initialData();

export const reloadData = () => {
  return initialData();
};
export default { fields, reloadData };
