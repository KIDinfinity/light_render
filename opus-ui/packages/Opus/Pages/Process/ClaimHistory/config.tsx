import React from 'react';
import CaseCategory from 'enum/CaseCategory';

import JPCLMOfClaimHistory from 'opus/Pages/Process/Claim/ClaimHistory';
import DocumentScanning from 'opus/Pages/Process/Claim/DocumentScanningHistory';
import NonOpusSupportedClaimHistory from 'opus/Pages/Process/Claim/NonOpusSupportedClaimHistory';

import { NAMESPACE as JPCLMOfClaimHistoryNAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { NAMESPACE as NonOpusSupportedClaimHistoryNAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

export default [
  {
    caseCategory: [
      CaseCategory.JP_CLM_CTG001,
      CaseCategory.JP_CLM_CTG002,
      CaseCategory.JP_CLM_CTG003,
      CaseCategory.JP_CLM_CTG004,
    ],
    initEffect: 'getCaseDetails',
    NAMESPACE: JPCLMOfClaimHistoryNAMESPACE,
    component: (props: any) => <JPCLMOfClaimHistory {...props} />,
  },
  {
    caseCategory: CaseCategory.BP_DC_CTG002,
    initEffect: 'getCaseDetails',
    NAMESPACE: 'opusDocumentScanning',
    component: (props: any) => <DocumentScanning {...props} />,
  },
  {
    caseCategory: CaseCategory.JP_CLM_CTG005,
    initEffect: 'getCaseDetails',
    NAMESPACE: NonOpusSupportedClaimHistoryNAMESPACE,
    component: (props: any) => <NonOpusSupportedClaimHistory {...props} />,
  },
  {
    caseCategory: CaseCategory.JP_CLM_CTG007,
    initEffect: 'getCaseDetails',
    NAMESPACE: NonOpusSupportedClaimHistoryNAMESPACE,
    component: (props: any) => <NonOpusSupportedClaimHistory {...props} />,
  },
];
