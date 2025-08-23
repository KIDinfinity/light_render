import { formatMessageApi } from '@/utils/dictFormatMessage';
export default [
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.assessment-decision',
    }),
    field: 'assessmentDecision',
    fieldType: 'Dropdown',
    dictTypeCode: 'Dropdown_CLM_AssessmentDecision',
  },
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.total-payment-amount',
    }),
    field: 'totalPaymentAmount',
    fieldType: 'Number',
  },
  {
    label: formatMessageApi({ Label_BIZ_POS: 'InsuredName' }),
    field: 'insuredName',
    fieldType: 'Text',
  },
  {
    label: formatMessageApi({ Label_COM_ReportCenter: 'bs_client_number' }),
    field: 'insuredId',
    fieldType: 'Text',
  },
  {
    label: formatMessageApi({ Label_BIZ_Claim: 'ClaimType' }),
    field: 'claimType',
    fieldType: 'Dropdown',
    dictTypeCode: 'ClaimType',
  },
  {
    label: formatMessageApi({ Label_BIZ_Claim: 'ClaimedDisease' }),
    field: 'claimDisease',
    fieldType: 'Text',
  },
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
    }),
    field: 'causeOfIncident',
    fieldType: 'Dropdown',
    dictTypeCode: 'CauseOfIncident',
  },
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
    }),
    field: 'incidentDate',
    fieldType: 'Date',
  },
];
