import React, { lazy }  from 'react';
import CaseCategory from 'enum/CaseCategory';

import { NAMESPACE as TaskDetailOfClaimHistoryNAMESPACE } from 'claimBasicProduct/pages/ClaimHistory/activity.config';
import { NAMESPACE as APOfClaimHistoryNAMESPACE } from 'claim/pages/Thailand/ProcessOfAP/APOfClaimHistory/activity.config';
import { NAMESPACE as DAOfClaimHistoryNAMESPACE } from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessmentHistory/activity.config';
import { NAMESPACE as JPCLMOfClaimHistoryNAMESPACE } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfClaimHistory/activity.config';
import { NAMESPACE as MJOfClaimHistoryNAMESPACE } from 'claim/pages/Thailand/ProcessOfMJ/MJOfClaimHistory/activity.config';
import { NAMESPACE as HBOfClaimHistoryNAMESPACE } from 'claim/pages/Thailand/ProcessOfHB/HBOfHistory/activity.config';
import { NAMESPACE as PHIOfClaimHistoryNAMESPACE } from 'claim/pages/Philippines/ProcessOfPHICLM/ClaimHistory/activity.config';
import { NAMESPACE as HKOfClaimHistoryNAMESPACE } from 'process/HKCLM/ClaimHistory/activity.config';
import { NAMESPACE as PHOfClaimHistoryNAMESPACE } from 'process/PHCLM/ClaimHistory/activity.config';
import { NAMESPACE as AppealOfClaimHistoryNAMESPACE } from 'claim/pages/AppealCase/ClaimHistory/activity.config';
import { NAMESPACE as NewJPCLMOfClaimHistoryNAMESPACE } from 'process/JPCLM/ClaimHistory/activity.config';
import { NAMESPACE as NewTHCLMOfClaimHistoryNAMESPACE } from 'process/THCLM/ClaimHistory/activity.config';
import { NAMESPACE as IDCLMOfClaimHistoryNAMESPACE } from 'process/IDCLM/ClaimHistory/activity.config';
import { NAMESPACE as HKCLMOfDataCaptureController } from 'process/HKCLM/ClaimDecision/activity.config';


const TaskDetailOfClaimHistory = lazy(() => import('claimBasicProduct/pages/ClaimHistory'));
const APOfClaimHistory = lazy(() => import('claim/pages/Thailand/ProcessOfAP/APOfClaimHistory'));
const DAOfClaimHistory = lazy(() => import('claim/pages/Thailand/ProcessOfDA/DAOfAssessmentHistory'));
const JPCLMOfClaimHistory = lazy(() => import('claim/pages//Japan/ProcessOfJPCLM/JPCLMOfClaimHistory'));
const MJOfClaimHistory = lazy(() => import('claim/pages/Thailand/ProcessOfMJ/MJOfClaimHistory'));
const HBOfClaimHistory = lazy(() => import('claim/pages/Thailand/ProcessOfHB/HBOfHistory'));
const PHIOfClaimHistory = lazy(() => import('claim/pages/Philippines/ProcessOfPHICLM/ClaimHistory'));
const HKOfClaimHistory = lazy(() => import('process/HKCLM/ClaimHistory'));
const AppealOfClaimHistory = lazy(() => import('claim/pages/AppealCase/ClaimHistory'));
const NewJPCLMOfClaimHistory = lazy(() => import('process/JPCLM/ClaimHistory'));
const NewTHCLMOfClaimHistory = lazy(() => import('process/THCLM/ClaimHistory'));
const IDCLMOfClaimHistory = lazy(() => import('process/IDCLM/ClaimHistory'));
const NewPHOfClaimHistory = lazy(() => import('process/PHCLM/ClaimHistory'));
const ClaimDecisionHistory = lazy(() => import('process/HKCLM/ClaimDecision/History'));

export default [
  {
    caseCategory: CaseCategory.Claim_Request,
    initEffect: 'getClaimData',
    NAMESPACE: TaskDetailOfClaimHistoryNAMESPACE,
    component: (props: any) => <TaskDetailOfClaimHistory {...props} />,
  },
  {
    caseCategory: CaseCategory.IAPC,
    initEffect: 'getClaim',
    NAMESPACE: APOfClaimHistoryNAMESPACE,
    component: (props: any) => <APOfClaimHistory {...props} />,
  },
  {
    caseCategory: [
      CaseCategory.IDAC,
      CaseCategory.TH_GC_CTG01,
      CaseCategory.TH_GC_CTG02,
      CaseCategory.TH_GC_CTG03,
      CaseCategory.TH_GC_CTG04,
      CaseCategory.TH_GC_CTG06,
      CaseCategory.TH_GC_CTG07,
    ],
    initEffect: 'getClaim',
    NAMESPACE: DAOfClaimHistoryNAMESPACE,
    component: (props: any) => <DAOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.JP_CLM_CTG01, CaseCategory.JP_PC_CTG01],
    initEffect: 'getClaim',
    NAMESPACE: JPCLMOfClaimHistoryNAMESPACE,
    component: (props: any) => <JPCLMOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.JP_CLM_CTG001, CaseCategory.JP_CLM_CTG002],
    initEffect: 'getClaim',
    NAMESPACE: NewJPCLMOfClaimHistoryNAMESPACE,
    component: (props: any) => <NewJPCLMOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.TH_CLM_CTG001, CaseCategory.TH_CLM_CTG002],
    initEffect: 'getClaimData',
    NAMESPACE: NewTHCLMOfClaimHistoryNAMESPACE,
    component: (props: any) => <NewTHCLMOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.BP_CLM_CTG002],
    initEffect: 'getClaimData',
    NAMESPACE: IDCLMOfClaimHistoryNAMESPACE,
    component: (props: any) => <IDCLMOfClaimHistory {...props} />,
  },
  {
    caseCategory: CaseCategory.TH_MC_CTG01,
    initEffect: 'getHistory',
    NAMESPACE: MJOfClaimHistoryNAMESPACE,
    component: (props: any) => <MJOfClaimHistory {...props} />,
  },
  {
    caseCategory: CaseCategory.TH_GC_CTG05,
    initEffect: 'getClaim',
    NAMESPACE: HBOfClaimHistoryNAMESPACE,
    component: (props: any) => <HBOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.PH_CLM_CTG001, CaseCategory.PH_CLMUW_CTG001],
    initEffect: 'getClaim',
    NAMESPACE: PHIOfClaimHistoryNAMESPACE,
    component: (props: any) => <PHIOfClaimHistory {...props} />,
  },
  {
    caseCategory: [
      CaseCategory.HK_CLM_CTG001,
      CaseCategory.HK_CLM_CTG002,
      CaseCategory.BP_CLM_CTG005,
    ],
    initEffect: 'getClaimData',
    NAMESPACE: HKOfClaimHistoryNAMESPACE,
    component: (props: any) => <HKOfClaimHistory {...props} />,
  },
  {
    caseCategory: [
      CaseCategory.BP_CLM_CTG007,
      CaseCategory.BP_CLM_CTG008,
      CaseCategory.BP_AP_CTG01,
    ],
    initEffect: 'getClaimData',
    NAMESPACE: PHOfClaimHistoryNAMESPACE,
    component: (props: any) => <NewPHOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.PH_AP_CTG01],
    initEffect: 'getClaimAssessment',
    NAMESPACE: AppealOfClaimHistoryNAMESPACE,
    component: (props: any) => <AppealOfClaimHistory {...props} />,
  },
  {
    caseCategory: [CaseCategory.BP_CLM_CTG009],
    initEffect: 'getClaimData',
    NAMESPACE: HKCLMOfDataCaptureController,
    component: (props: any) => <ClaimDecisionHistory {...props} />,
  },
];
