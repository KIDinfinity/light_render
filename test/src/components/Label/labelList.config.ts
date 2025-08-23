import { ReactComponent as UrgentSvg } from '@/assets/urgent.svg';
import { ReactComponent as STPSvg } from '@/assets/STP.svg';
import { ReactComponent as PendingSvg } from '@/assets/pending.svg';
import { ReactComponent as AppealSvg } from '@/assets/appeal.svg';
import { ReactComponent as VIPSvg } from '@/assets/VIP.svg';
import { ReactComponent as OverdueSvg } from '@/assets/Overdue.svg';
import { ReactComponent as PreDefineDecisionIndSvg } from '@/assets/preDefineDecisionInd.svg';
import { ReactComponent as STASvg } from '@/assets/STA.svg';
import { ReactComponent as WithdrawSvg } from '@/assets/withdraw.svg';
import { ReactComponent as AgeCrossSvg } from '@/assets/ageCross.svg';
import { ReactComponent as DukcapilVerified } from '@/assets/dukcapilVerified.svg';
import { ReactComponent as OCRPassNoSvg } from '@/assets/OCRPassNo.svg';
import { ReactComponent as InvestigationSvg } from '@/assets/Investigation.svg';
import { ReactComponent as ExpressClaimSvg } from '@/assets/ExpressClaimSvg.svg';
import { ReactComponent as PendingOverdueSvg } from '@/assets/PendingOverdue.svg';

export default [
  {
    id: 'isUrgent',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Urgent',
    component: UrgentSvg,
    className: 'anction-Urgent',
  },
  {
    id: 'vip',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'VIP',
    component: VIPSvg,
    className: 'anction-VIP',
  },
  {
    id: 'fullStp',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'STP',
    component: STPSvg,
    className: 'anction-STP',
  },
  {
    id: 'onHold',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'pending',
    component: PendingSvg,
    className: 'anction-Pending',
  },
  {
    id: 'appealFlag',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Appeal',
    component: AppealSvg,
    className: 'anction-Reversed',
  },
  {
    id: 'isSta',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'STA',
    component: STASvg,
    className: 'anction-STA',
  },
  {
    id: 'Withdrawal',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Withdrawal',
    component: WithdrawSvg,
    className: 'anction-Withdraw',
  },
  {
    id: 'notWait',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'overdue',
    component: OverdueSvg,
    className: 'anction-NotWait',
  },
  {
    id: 'preDefineDecisionInd',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'PreDefineDecision',
    component: PreDefineDecisionIndSvg,
    className: 'anction-preDefineDecisionInd',
  },

  {
    id: 'Urgent',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Urgent',
    component: UrgentSvg,
    className: 'anction-Urgent',
  },
  {
    id: 'VIP',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'VIP',
    component: VIPSvg,
    className: 'anction-VIP',
  },

  {
    id: 'STP', // ??
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'STP',
    component: STPSvg,
    className: 'anction-STP',
  },
  {
    id: 'Pending',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'pending',
    component: PendingSvg,
    className: 'anction-Pending',
  },
  {
    id: 'Reversal',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Appeal',
    component: AppealSvg,
    className: 'anction-Reversed',
  },
  {
    id: 'STA',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'STA',
    component: STASvg,
    className: 'anction-STA',
  },
  {
    id: 'withdraw', //??
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'Withdrawal',
    component: WithdrawSvg,
    className: 'anction-Withdraw',
  },
  {
    id: 'Overdue',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'overdue',
    component: OverdueSvg,
    className: 'anction-NotWait',
  },
  {
    id: 'PreDecision',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'PreDefineDecision',
    component: PreDefineDecisionIndSvg,
    className: 'anction-preDefineDecisionInd',
  },
  {
    id: 'AgeCross',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'AgeCross',
    component: AgeCrossSvg,
    className: 'anction-AgeCross',
  },
  {
    id: 'DukcapilVerificationNo',
    typeCode: 'Label_BIZ_Indiviual',
    dictCode: 'DukcapilVerificationNo',
    component: DukcapilVerified,
    className: 'anction-DukcapilVerified',
  },
  {
    id: 'OCRPassNo',
    typeCode: 'Label_BIZ_Indiviual',
    dictCode: 'OCRPassNo',
    component: OCRPassNoSvg,
    className: 'anction-OCRPassNo',
  },
  {
    id: 'Investigation',
    typeCode: 'Label_BIZ_Claim',
    dictCode: 'Investigation',
    component: InvestigationSvg,
    className: 'anction-Investigation',
  },
  {
    id: 'expressClaim',
    typeCode: 'Label_BIZ_Claim',
    dictCode: 'ExpressClaim',
    component: ExpressClaimSvg,
    className: 'anction-ExpressClaim',
  },
  {
    id: 'EnvoyReminderLabel',
    typeCode: 'Label_BPM_CaseInfo',
    dictCode: 'EnvoyReminderLabel',
    component: PendingOverdueSvg,
    className: 'anction-EnvoyReminderLabel',
  },
  // {
  //   id: 'PrimaryPolicy',
  //   typeCode: 'Label_BPM_CaseInfo',
  //   dictCode: 'PrimaryPolicy',
  //   component: PrimaryPolicySvg,
  //   className: 'anction-PrimaryPolicy',
  // },
  // {
  //   id: 'SubsidiaryPolicy',
  //   typeCode: 'Label_BPM_CaseInfo',
  //   dictCode: 'SubsidiaryPolicy',
  //   component: SubsidiaryPolicySvg,
  //   className: 'anction-PrimaryPolicy',
  // },
];
