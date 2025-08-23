import { Operation } from './Operation';
import { ManualAdd } from './ManualAdd';
export { CommonYN } from './CommonYN';

export enum DropdownPRCCaseCategory {
  eSubmission = 'HK_CLM_CTG001',
  submission = 'HK_CLM_CTG002',
}

export enum SubmissionChannel {
  eSubmission = 'ESRV',
  scanner = 'SCN',
  Physical = 'P',
  Digital = 'D',
  GOPBilling = 'GB',
}

export enum relationshipWithInsuredForHK {
  self = 'S',
  policyOwner = 'O',
  others = 'T',
  beneficiary = 'B',
  medicalProvider = 'P',
}

export enum relationshipWithInsuredForJP {
  Self = 'S',
  PolicyOwner = 'O',
  Others = 'T',
  Beneficiary = 'B',
  Agent = 'A',
  AgentClaimant = 'AE',
  BranchAgent = 'BA',
}

/**
 * 01 代理店
02 被保険者
03 契約者
04 営業
05 受取人
06 指定代理請求人
09 その他
 */

export enum ClaimantTypeForJP {
  Agent = '01',
  Insured = '02',
  PolicyOwner = '03',
  BranchAgent = '04',
  Payee = '05',
  AgentEntrusted = '06',
  Others = '09',
}

export enum Flags {
  n = 'no_reassessment',
}

export enum CaseSource {
  CaseSource = 'C',
  Reimbursement = 'R',
}

export enum ClaimType {
  IPD = 'IP',
  OPD = 'OP',
  SG = 'SG',
  RT = 'RT',
  AMD = 'AMD',
  HP = 'HP',
}

export enum ServiceItem {
  JPADMED = 'JPADMED',
  JPADMEDNAME = 'JPADMED-先進医療',
}

export enum IsDefault {
  YES = 'Y',
}

export enum PaymentType {
  LS = 'LS',
  URGE = 'URGE',
}

export enum SearchListType {
  CLEAR = 'clear',
  SAVE = 'save',
  PAGE = 'page',
}

export default {
  Operation,
  ManualAdd,
  IsDefault,
  PaymentType,
};
