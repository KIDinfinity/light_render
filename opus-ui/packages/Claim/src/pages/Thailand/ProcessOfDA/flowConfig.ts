import lodash from 'lodash';
import claimDaClaimAssessmentControllerService from '@/services/claimDaClaimAssessmentControllerService';
import claimOpdClaimAssessmentControllerService from '@/services/claimOpdClaimAssessmentControllerService';
import claimPaClaimAssessmentControllerService from '@/services/claimPaClaimAssessmentControllerService';
import claimRbClaimAssessmentControllerService from '@/services/claimRbClaimAssessmentControllerService';
import claimPbClaimAssessmentControllerService from '@/services/claimPbClaimAssessmentControllerService';

import claimDaClaimCaseControllerService from '@/services/claimDaClaimCaseControllerService';
import claimRbClaimCaseControllerService from '@/services/claimRbClaimCaseControllerService';
import claimOpdClaimCaseControllerService from '@/services/claimOpdClaimCaseControllerService';
import claimPaClaimCaseControllerService from '@/services/claimPaClaimCaseControllerService';
import claimPbClaimCaseControllerService from '@/services/claimPbClaimCaseControllerService';

import claimDaAutoAssessmentControllerService from '@/services/claimDaAutoAssessmentControllerService';
import claimApAutoAssessmentControllerService from '@/services/claimApAutoAssessmentControllerService';
import claimRbAutoAssessmentControllerService from '@/services/claimRbAutoAssessmentControllerService';
import claimPaAutoAssessmentControllerService from '@/services/claimPaAutoAssessmentControllerService';
import claimOpdAutoAssessmentControllerService from '@/services/claimOpdAutoAssessmentControllerService';
import claimPbAutoAssessmentControllerService from '@/services/claimPbAutoAssessmentControllerService';
import claimApClaimAssessmentControllerService from '@/services/claimApClaimAssessmentControllerService';

export const getClaimAssessment = {
  TH_GC_CTG01: claimRbClaimAssessmentControllerService.getClaimAssessment,
  TH_GC_CTG02: claimPaClaimAssessmentControllerService.getClaimAssessment,
  TH_GC_CTG03: claimOpdClaimAssessmentControllerService.getClaimAssessment,
  TH_GC_CTG04: claimPbClaimAssessmentControllerService.getClaimAssessment,
  TH_GC_CTG06: claimDaClaimAssessmentControllerService.getClaimAssessment,
  TH_GC_CTG07: claimDaClaimAssessmentControllerService.getClaimAssessment,
  IDAC: claimDaClaimAssessmentControllerService.getClaimAssessment,
  IAPC: claimApClaimAssessmentControllerService.getClaimAssessment,
};

export const reAssessmentService = {
  TH_GC_CTG01: claimRbAutoAssessmentControllerService.reAssessment,
  TH_GC_CTG02: claimPaAutoAssessmentControllerService.reAssessment,
  TH_GC_CTG03: claimOpdAutoAssessmentControllerService.reAssessment,
  TH_GC_CTG04: claimPbAutoAssessmentControllerService.reAssessment,
  TH_GC_CTG06: claimOpdAutoAssessmentControllerService.cashlessReAssessment,
  TH_GC_CTG07: claimOpdAutoAssessmentControllerService.cashlessReAssessment,
  IDAC: claimDaAutoAssessmentControllerService.reAssessment,
  IAPC: claimApAutoAssessmentControllerService.reAssessment,
};

export const get = {
  TH_GC_CTG01: claimRbClaimCaseControllerService.get,
  TH_GC_CTG02: claimPaClaimCaseControllerService.get,
  TH_GC_CTG03: claimOpdClaimCaseControllerService.get,
  TH_GC_CTG04: claimPbClaimCaseControllerService.get,
  IDAC: claimDaClaimCaseControllerService.get,
};

export const historyTitle = {
  TH_GC_CTG01: 'venus-claim-label-reimbursementInquiry',
  TH_GC_CTG02: 'venus-claim-label-preArrangementInquiry',
  TH_GC_CTG03: 'venus-claim-label-OPDHospitalBillInquiry',
  TH_GC_CTG04: 'venus-claim-label-partialBillInquiry',
  IDAC: 'venus-claim-label-daInquiry',
  TH_GC_CTG06: 'OPDCashlessInquiry',
  TH_GC_CTG07: 'OPDHospitalPortal',
};

export const caseCategoryNameQc = {
  TH_GC_CTG01: 'Reimbursement QC',
  TH_GC_CTG02: 'Pre-arrangement QC',
  TH_GC_CTG03: 'OPD(Hospital Billing) QC',
  TH_GC_CTG04: 'Partial Bill QC',
  IDAC: 'Da Qc',
};

export const caseCategoryNameAssessment = {
  TH_GC_CTG01: 'Reimbursement Assessment',
  TH_GC_CTG02: 'Pre-arrangement Assessment',
  TH_GC_CTG03: 'OPD(Hospital Billing) Assessment',
  TH_GC_CTG04: 'Partial Bill Assessment',
  IDAC: 'Da Assessment',
};

export const getTaskHeaderTitle = ({ caseCategory, taskDefKey }) => {
  const allConfig = {
    TH_GC_CTG01: {
      default: 'Reimbursement Assessment',
      CP_ACT004: 'Menual Approval',
    },
    TH_GC_CTG02: {
      default: 'Pre-arrangement Assessment',
      CP_ACT004: 'Menual Approval',
    },
    TH_GC_CTG03: {
      default: 'OPD(Hospital Billing) Assessment',
      CP_ACT004: 'Menual Approval',
    },
    TH_GC_CTG04: {
      default: 'Partial Bill Assessment',
      CP_ACT004: 'Menual Approval',
    },
    IDAC: {
      default: 'Da Assessment',
      CP_ACT004: 'Menual Approval',
    },
  };
  return (
    lodash.get(allConfig, `${caseCategory}.${taskDefKey}`) ||
    lodash.get(allConfig, `${caseCategory}.default`, '') ||
    taskDefKey
  );
};
