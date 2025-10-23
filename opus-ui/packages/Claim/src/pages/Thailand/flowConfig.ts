import lodash from 'lodash';
import CaseCategory from 'enum/CaseCategory';

// formName="assessmentDecision"
export const isReimbursement = (caseCategory: any) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG01;
export const isPartialBill = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG04;
export const isPreArrangement = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG02;
export const isOPDHospitalBill = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG03;
export const isOPDCashless = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG06;
export const isOPDHospitalPortal = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_GC_CTG07;
export const isIDAC = (caseCategory: any) => lodash.toUpper(caseCategory) === CaseCategory.IDAC;
export const isIHB = (caseCategory: string) =>
  lodash.toUpper(caseCategory) === CaseCategory.TH_IHB_CTG01;
